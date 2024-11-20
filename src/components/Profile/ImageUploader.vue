<template>
  <div>
    <input ref="input" type="file" name="image" accept="image/*" @change="setImage" v-show="false" />
    <div class="card flex justify-content-center">
      <div class="image-actions">
        <button class="button is-primary is-small" @click.prevent="showFileChooser">
          <i class="pi pi-file" style="font-size: 1rem; padding-right: 6px;"></i>
          Browse
        </button>
        <button class="button is-primary is-small" @click.prevent="reset" v-if="imgSrc">
          <i class="pi pi-refresh" style="font-size: 1rem; padding-right: 6px;"></i>
          Reset Crop
        </button>
        <button class="button is-primary is-small" @click.prevent="cropAndUploadImage" v-if="imgSrc">
          <i class="pi pi-upload" style="font-size: 1rem; padding-right: 6px;"></i>
          Upload Image
        </button>
      </div>
    </div>
    <div class="card flex justify-content-center">
      <div class="content" v-if="imgSrc">
        <section class="cropper-area">
          <div class="img-cropper">
            <vue-cropper ref="cropper" :aspectRatio="1" :src="imgSrc" :cropBoxMovable="true" :cropBoxResizable="false"
              :cropBoxWidth="150" :cropBoxHeight="150" :viewMode="1" :zoomable="true" :dragMode="move" />
          </div>
          <div class="crop-actions">
            <a href="#" @click.prevent="zoom(0.2)">
              <i class="pi pi-plus" style="font-size: 1rem"></i>
            </a>
            <a href="#" @click.prevent="zoom(-0.2)">
              <i class="pi pi-minus" style="font-size: 1rem"></i>
            </a>
            <a href="#" @click.prevent="move(-10, 0)">
              <i class="pi pi-angle-left" style="font-size: 1rem"></i>
            </a>
            <a href="#" @click.prevent="move(10, 0)">
              <i class="pi pi-angle-right" style="font-size: 1rem"></i>
            </a>
            <a href="#" @click.prevent="move(0, -10)">
              <i class="pi pi-angle-up" style="font-size: 1rem"></i>
            </a>
            <a href="#" @click.prevent="move(0, 10)">
              <i class="pi pi-angle-down" style="font-size: 1rem"></i>
            </a>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import VueCropper from 'vue-cropperjs';
import 'cropperjs/dist/cropper.css';
import { PrimeIcons } from 'primevue/api';
import { UserApi } from 'src/api/userApi';
import { useUserSessionStore } from 'src/store/userSessionStore';
import { useProfileStore } from 'src/store/profileStore';
import { useToast } from "primevue/usetoast";

export default {
  components: {
    VueCropper,
    PrimeIcons,
  },
  data() {
    return {
      imgSrc: null,
      cropImg: '',
      data: null,
      isFirstImageBeingLoaded: true,
      userApi: UserApi(),
      userSessionStore: useUserSessionStore(),
      profileStore: useProfileStore(),
      toast: useToast()
    };
  },
  methods: {
    async cropAndUploadImage() {
      this.cropImage();

      const binaryData = this.convertImageUrlDataToBinary();
      const uint8Array = this.getUnit8ArrayFromBinary(binaryData);
      const blob = this.getBlobFromUnit8Array(uint8Array);

      await this.uploadImage(blob);

      this.closeUploadModal();
    },

    cropImage() {
      this.cropImg = this.$refs.cropper.getCroppedCanvas().toDataURL();
      if (!this.cropImg) {
        alert('No cropped image available');
        return;
      }
    },

    convertImageUrlDataToBinary() {
      return atob(this.cropImg.split(',')[1]);
    },

    getUnit8ArrayFromBinary(binaryData) {
      const uint8Array = new Uint8Array(binaryData.length);
      for (let i = 0; i < binaryData.length; i++) {
        uint8Array[i] = binaryData.charCodeAt(i);
      }
      return uint8Array;
    },

    getBlobFromUnit8Array(uint8Array) {
      return new Blob([uint8Array], { type: 'application/octet-stream' });
    },

    async uploadImage(blob) {
      const response = await this.profileStore.uploadProfilePicture(blob);

      if (this.isUploadSuccessful(response)) {
        await this.handleSuccessfulUpload();
      } else {
        this.handleFailedUpload();
      }
    },

    isUploadSuccessful(response) {
      return response.status === 201;
    },

    async handleSuccessfulUpload() {
      this.toast.add({ severity: 'success', summary: 'Success', detail: 'Your profile picture was successfully uploaded', life: 3000 });
      await this.userSessionStore.refreshProfilePicture();
    },

    handleFailedUpload() {
      this.toast.add({ severity: 'error', summary: 'Error', detail: 'Your profile picture could not be uploaded', life: 3000 });
    },

    closeUploadModal() {
      this.profileStore.toggleProfilePictureUploadModal();
    },

    move(offsetX, offsetY) {
      this.$refs.cropper.move(offsetX, offsetY);
    },

    reset() {
      this.$refs.cropper.reset();
    },

    setImage(e) {
      const file = e.target.files[0];

      if (file.type.indexOf('image/') === -1) {
        alert('Please select an image file');
        return;
      }

      if (typeof FileReader === 'function') {
        const reader = new FileReader();

        reader.onload = (event) => {
          this.imgSrc = event.target.result;
          if (!this.isFirstImageBeingLoaded) {
            this.$refs.cropper.replace(event.target.result);
          }

          if (this.isFirstImageBeingLoaded) {
            this.isFirstImageBeingLoaded = false;
          }
        };

        reader.readAsDataURL(file);
      } else {
        alert('Sorry, FileReader API not supported');
      }
    },

    showFileChooser() {
      this.$refs.input.click();
    },

    zoom(percent) {
      this.$refs.cropper.relativeZoom(percent);
    }
  }
};
</script>

<style  scoped>
body {
  font-family: Arial, Helvetica, sans-serif;
  padding: 10px;
}

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.cropper-area {
  width: 100%;
  max-width: 400px;
}

.crop-actions {
  margin-top: 1rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.crop-actions a {
  margin: 0.5rem;
  padding: 5px 15px;
  background: #06557A;
  color: white;
  text-decoration: none;
  border-radius: 3px;
}

.image-actions {
  margin-top: 2px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

textarea {
  width: 100%;
  height: 100px;
  margin-top: 1rem;
}

.button {
  margin: 10px;
}
</style>

