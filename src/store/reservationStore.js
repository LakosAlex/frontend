import { defineStore } from 'pinia';
import { AssetApi } from 'src/api/assetApi';
import { ReservationApi } from 'src/api/reservationApi';
import { useDateStore } from 'src/store/dateStore';

const reservationApi = ReservationApi();
const assetApi = AssetApi();

const dateStore = useDateStore();

export const useReservationStore = defineStore('reservationStore', {
    state: () => ({
        rooms: [],
        workstations: [],
        reservations: [],
        reservationsAtGivenDate: [],
        isFilteringActive: false,
        loggedInUserReservations: []
    }),

    actions: {
        async fetchData() {
            console.log("fetchData gotCalled")
            try {
                const rooms = await assetApi.getRooms(); 
                const workstations = await assetApi.getWorkstations();

                const workstationMap = workstations.reduce((map, workstation) => {
                    if (workstation.room) {
                        const roomId = workstation.room.id;
                        if (!map[roomId]) {
                            map[roomId] = [];
                        }
                        map[roomId].push({
                            ...workstation,
                            status: 'available',
                            reservations: [], 
                        });
                    } else {
                        if (!map['unassigned']) {
                            map['unassigned'] = [];
                        }
                        map['unassigned'].push({
                            ...workstation,
                            status: 'available',
                            reservations: [], 
                        });
                    }
                    return map;
                }, {});


                this.rooms = rooms.map((room) => ({
                    ...room,
                    workstations: workstationMap[room.id] || [],
                }));

                const reservations = await reservationApi.getReservations(dateStore.choosenDate) // Fetch reservations

                reservations.forEach((reservation) => {
                    const workstationId = reservation.workstation.id;
                    this.rooms.forEach((room) => {
                        room.workstations.forEach((workstation) => {
                            if (workstation.id === workstationId) {
                                workstation.reservations.push(reservation);
                                workstation.status = 'reserved';
                            }
                        });
                    });
                });

                this.rooms.forEach((room) => {
                    const totalWorkstations = room.workstations.length;
                    const reservedWorkstations = room.workstations.filter(
                        (workstation) => workstation.reservations.length > 0
                    ).length;

                    room.totalWorkstations = totalWorkstations;
                    room.reservedWorkstations = reservedWorkstations;

                    if (totalWorkstations === 0) {
                        room.progress = 0; 
                    } else {
                        room.progress = (reservedWorkstations / totalWorkstations) * 100;
                    }
                });

                console.log(this.rooms);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        },

        toggleIsFilteringActive() {
            this.isFilteringActive = !this.isFilteringActive;
            console.log(this.isFilteringActive);
        },

        async createReservation(workstation) {
            const reservationData = {
                name: "my reservation name",
                reservedDay: dateStore.choosenDate,
                workstation: {
                    id: workstation.id
                }
            }
            await reservationApi.createReservation(reservationData);
        },

        async getReservationsByDate() {
            this.reservationsAtGivenDate = await reservationApi.getReservations(dateStore.choosenDate);
            console.log("FROM STORE");
            console.log(this.reservationsAtGivenDate);
        },

        async fetchLoggedInUserReservations() {
            const reservations = await reservationApi.getLoggedInUserReservations();
            this.loggedInUserReservations = reservations;
        },

        async cancelReservation(requestId) {
            return await reservationApi.deleteReservation(requestId);
        },
    },
});