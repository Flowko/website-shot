<template>
  <section class="py-20">
    <div class="flex flex-col bg-[#FAFBFB] rounded-md shadow-lg">
      <input
        v-if="selectedType != 'multiple-imgs'"
        class="w-full p-3 transition-all ease-linear delay-75 border-2 rounded-md outline-none focus:outline-none focus:border-primary-200 focus:border-dashed"
        @keyup.enter="generateScreenshot"
        placeholder="https://github.com/flowko..."
        type="url"
        v-model="params.url"
      />

      <div class="flex items-center justify-center my-4 space-x-10">
        <div
          class="flex flex-col items-center justify-center w-32 h-32 text-center bg-gray-200 cursor-pointer rounded-2xl hover:bg-gray-300"
          :class="{
            'border-primary-200 border-dashed border-2 shadow-md ':
              selectedType == type.value,
          }"
          @click="selectedType = type.value"
          v-for="(type, index) in types"
          :key="index"
        >
          <span class="text-xl font-bold">
            {{ type.label }}
          </span>
          <img
            :src="require(`../assets/icons/${type.icon}.svg`)"
            class="block w-8 mt-2"
          />
        </div>
      </div>

      <div
        class="flex flex-col p-4 space-y-3"
        v-if="selectedType == 'multiple-imgs'"
      >
        <div
          class="flex items-center space-x-4"
          v-for="(url, index) in params.urls"
          :key="index"
        >
          <input
            class="w-full p-3 transition-all ease-linear delay-75 border-2 rounded-md outline-none focus:outline-none focus:border-primary-200 focus:border-dashed"
            :placeholder="`URL - ${index}`"
            type="url"
            v-model="url.url"
          />

          <b-button
            icon-left="plus-outline"
            @click="addUrl(params.urls)"
            type="is-success is-light"
            class="border !border-lime-400"
          ></b-button>
          <b-button
            icon-left="close-outline"
            @click="removeUrl(index, params.urls)"
            type="is-danger is-light"
            class="border !border-red-500"
          ></b-button>
        </div>
        <b-field>
          <b-checkbox type="is-info" v-model="params.keepUrlStructure">
            Use Same URL Original Structure
            <b-tooltip type="is-success is-dark" position="is-bottom">
              <template v-slot:content>
                <div class="text-base">
                  <b>Unchecked:</b> Saves screenshots of all pages in the same
                  parent folder.
                  <br />
                  <b>Checked:</b> Saves screenshots of all pages in their own
                  folders.
                </div>
              </template>
              <b-icon
                type="is-success"
                icon="information-outline"
                size="is-small"
              >
              </b-icon>
            </b-tooltip>
          </b-checkbox>
        </b-field>
      </div>

      <div class="s-grid">
        <div class="s-row">
          <div class="s-grid-item">
            <b-field label="Resolutions:">
              <template #label>
                Resolutions:
                <b-tooltip type="is-success is-dark" position="is-bottom">
                  <template v-slot:content>
                    <div class="text-base">
                      Resolution in which the screenshot will be<br />
                      taken in. [width x height] format.
                    </div>
                  </template>
                  <b-icon
                    type="is-success"
                    icon="information-outline"
                    size="is-small"
                  >
                  </b-icon>
                </b-tooltip>
              </template>
              <b-select
                v-model="params.size"
                expanded
                placeholder="Select a resolution"
              >
                <optgroup
                  v-for="(res, index) in resolutions"
                  :key="index"
                  :label="res.label"
                >
                  <option
                    v-for="(resolution, index2) in res.resolutions"
                    :value="resolution.value"
                    :key="index2"
                  >
                    {{ resolution.value }} ({{ resolution.label }})
                  </option>
                </optgroup>
              </b-select>
            </b-field>
          </div>
          <div class="s-grid-item">
            <label class="label"
              >Width:
              <b-tooltip type="is-success is-dark" position="is-bottom">
                <template v-slot:content>
                  <div class="text-base">
                    Width of the screenshot in pixels.
                  </div>
                </template>
                <b-icon
                  type="is-success"
                  icon="information-outline"
                  size="is-small"
                >
                </b-icon>
              </b-tooltip>
            </label>
            <div class="columns">
              <div class="column">
                <b-field>
                  <b-slider
                    type="is-info"
                    v-model="params.width"
                    :max="8000"
                    :min="240"
                    lazy
                  ></b-slider>
                </b-field>
              </div>
              <b-input class="column is-4" v-model="params.width"></b-input>
            </div>
          </div>
          <div class="s-grid-item">
            <label class="label"
              >Height:
              <b-tooltip type="is-success is-dark" position="is-bottom">
                <template v-slot:content>
                  <div class="text-base">
                    Height of the screenshot in pixels.
                  </div>
                </template>
                <b-icon
                  type="is-success"
                  icon="information-outline"
                  size="is-small"
                >
                </b-icon>
              </b-tooltip>
            </label>
            <div class="columns">
              <div class="column">
                <b-field>
                  <b-slider
                    type="is-info"
                    v-model="params.height"
                    :max="8000"
                    :min="240"
                    lazy
                  ></b-slider>
                </b-field>
              </div>
              <b-input class="column is-4" v-model="params.height"></b-input>
            </div>
          </div>
        </div>
        <div class="s-row">
          <div class="s-grid-item">
            <b-field>
              <b-switch v-model="params.fullPage" type="is-info">
                FullSize
              </b-switch>
              <b-tooltip type="is-success is-dark" position="is-bottom">
                <template v-slot:content>
                  <div class="text-base">
                    <b>Unchecked:</b> Crop the screenshot to the viewport size
                    <br />
                    <b>Checked:</b> Takes screenshot of the entire page
                  </div>
                </template>
                <b-icon
                  type="is-success"
                  icon="information-outline"
                  size="is-small"
                >
                </b-icon>
              </b-tooltip>
            </b-field>
          </div>
          <div class="s-grid-item">
            <b-field>
              <b-switch v-model="params.darkMode" type="is-info">
                DarkMode
              </b-switch>
              <b-tooltip type="is-success is-dark" position="is-bottom">
                <template v-slot:content>
                  <div class="text-base">
                    <b>Unchecked:</b> Light mode
                    <br />
                    <b>Checked:</b> Dark mode
                  </div>
                </template>
                <b-icon
                  type="is-success"
                  icon="information-outline"
                  size="is-small"
                >
                </b-icon>
              </b-tooltip>
            </b-field>
          </div>
          <div class="s-grid-item">
            <b-field>
              <b-switch v-model="params.save" type="is-info">
                Save content
              </b-switch>
              <b-tooltip type="is-success is-dark" position="is-bottom">
                <template v-slot:content>
                  <div class="text-base">
                    <b>Unchecked:</b> Doesn't save to server
                    <br />
                    <b>Checked:</b> Save to server
                  </div>
                </template>
                <b-icon
                  type="is-success"
                  icon="information-outline"
                  size="is-small"
                >
                </b-icon>
              </b-tooltip>
            </b-field>
          </div>
        </div>
        <div class="s-row">
          <div class="s-grid-item">
            <div class="flex items-center">
              <label
                >Delay in seconds:
                <b-tooltip type="is-success is-dark" position="is-bottom">
                  <template v-slot:content>
                    <div class="text-base">
                      Delay capturing the screenshot.<br />
                      Useful when the site does things after<br />
                      load that you want to capture.
                    </div>
                  </template>
                  <b-icon
                    type="is-success"
                    icon="information-outline"
                    size="is-small"
                  >
                  </b-icon> </b-tooltip
              ></label>
              <b-input
                class="column is-4"
                type="number"
                min="1"
                max="15"
                v-model="params.delay"
              ></b-input>
            </div>
          </div>
          <div class="s-grid-item">
            <label class="label"
              >Scale:
              <b-tooltip type="is-success is-dark" position="is-bottom">
                <template v-slot:content>
                  <div class="text-base">
                    Scale of the screenshot. [10% - 100%]<br />
                    (default: 100%).
                  </div>
                </template>
                <b-icon
                  type="is-success"
                  icon="information-outline"
                  size="is-small"
                >
                </b-icon>
              </b-tooltip>
            </label>
            <div class="columns">
              <div class="column">
                <b-field>
                  <b-slider
                    type="is-info"
                    v-model="params.scale"
                    :max="100"
                    :min="10"
                  ></b-slider>
                </b-field>
              </div>
              <b-input
                class="column is-4"
                rounded
                v-model="params.scale"
              ></b-input>
            </div>
          </div>
          <div class="s-grid-item" v-if="selectedType != 'pdf'">
            <b-field label="Format:">
              <template #label>
                Format:
                <b-tooltip type="is-success is-dark" position="is-bottom">
                  <template v-slot:content>
                    <div class="text-base">
                      Format of the screenshot (PNG | JPEG | WEBP).<br />
                      (default: PNG)
                    </div>
                  </template>
                  <b-icon
                    type="is-success"
                    icon="information-outline"
                    size="is-small"
                  >
                  </b-icon>
                </b-tooltip>
              </template>
              <b-select
                expanded
                placeholder="Select a format"
                v-model="params.format"
              >
                <option
                  v-for="option in imageFormats"
                  :value="option"
                  :key="option"
                >
                  .{{ option }}
                </option>
              </b-select>
            </b-field>
          </div>
          <div class="s-grid-item" v-else>
            <b-field label="PDF Formats:">
              <template #label>
                PDF Formats:
                <b-tooltip type="is-success is-dark" position="is-bottom">
                  <template v-slot:content>
                    <div class="text-base">
                      Paper Format in which the pdf will be genrated<br />
                      based on. select Resolution for [width x height] format.
                    </div>
                  </template>
                  <b-icon
                    type="is-success"
                    icon="information-outline"
                    size="is-small"
                  >
                  </b-icon>
                </b-tooltip>
              </template>
              <b-select
                v-model="params.pdf.format"
                expanded
                placeholder="Select a character"
              >
                <option
                  :value="format"
                  v-for="(format, index) in pdfFormats"
                  :key="index"
                >
                  {{ format }}
                </option>
              </b-select>
            </b-field>
          </div>
        </div>
        <div class="s-row">
          <div class="s-grid-item" v-if="$config.passwordEnabled">
            <label class="label">Password: </label>
            <b-input
              v-model="password"
              type="password"
              password-reveal
            ></b-input>
          </div>
        </div>
      </div>

      <div class="s-grid" v-if="loadStyleScript">
        <div class="col-span-6 p-4">
          <label class="label column"
            >Script:
            <b-tooltip type="is-success is-dark" position="is-bottom">
              <template v-slot:content>
                <div class="text-base">
                  Loads the script in the browser before taking<br />
                  screenshot of the page content, (Note: if the<br />
                  script doesnt do anything, add some delay)
                </div>
              </template>
              <b-icon
                type="is-success"
                icon="information-outline"
                size="is-small"
              >
              </b-icon> </b-tooltip
          ></label>
          <client-only>
            <CodeEditor
              theme="light"
              class="border rounded-lg border-border"
              :wrap_code="true"
              max_width="auto"
              width="auto"
              :copy_code="false"
              v-model="params.script"
              height="250px"
            ></CodeEditor>
          </client-only>
        </div>
        <div class="col-span-6 p-4">
          <label class="label column"
            >Style:
            <b-tooltip type="is-success is-dark" position="is-bottom">
              <template v-slot:content>
                <div class="text-base">
                  Loads the style in the browser before taking<br />
                  screenshot of the page content, (Note: if the<br />
                  style doesnt do anything, add some delay)
                </div>
              </template>
              <b-icon
                type="is-success"
                icon="information-outline"
                size="is-small"
              >
              </b-icon> </b-tooltip
          ></label>
          <client-only>
            <CodeEditor
              theme="light"
              class="border rounded-lg border-border"
              :languages="[['css', 'CSS']]"
              :wrap_code="true"
              max_width="auto"
              width="auto"
              :copy_code="false"
              v-model="params.style"
              height="250px"
            ></CodeEditor>
          </client-only>
        </div>
      </div>

      <div class="flex items-center justify-end m-4 space-x-4">
        <b-button
          v-if="result && result.url"
          icon-left="download-outline"
          @click="download"
          type="is-success is-light"
          class="border !border-lime-500 !border-dashed"
          :disabled="loading || !params.url"
          >Dowload Content</b-button
        >

        <b-button
          icon-left="palette-swatch"
          @click="loadStyleScript = !loadStyleScript"
          type="is-info is-light"
          class="border !border-primary-100"
          >Add Scripts/Styles</b-button
        >

        <b-button
          icon-left="camera-iris"
          @click="generateScreenshot"
          type="is-info"
          class="border !border-primary-100"
          >Capture Screenshot</b-button
        >
      </div>

      <div class="h-full overflow-y-auto box bg-blueGray-900">
        <p class="title is-5">Website Screenshot</p>
        <div v-if="result == null" class="mb-3">
          <p class="title is-4">Capture a website screenshot online</p>
          <p class="mt-4 text-white subtitle is-6">
            Generate a full web-page screenshot with our service Site-Shot: Web
            page screenshot service, that provides rich interface to make any
            kind of web screenshots online for free with no limits. The simplest
            way to take a full page screenshot, we support a long pages up to
            20000 pixels
          </p>
        </div>
        <b-progress v-if="loading" type="is-info"></b-progress>

        <embed
          v-if="result && result.url"
          :src="result.url"
          width="100%"
          style="height: 50vh; object-fit: cover"
        />
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "IndexPage",
  data() {
    return {
      types: [
        {
          value: "img",
          name: "image",
          label: "Image",
          icon: "image",
        },
        {
          value: "multiple-imgs",
          name: "multiple-images",
          label: "Multiple Images",
          icon: "images",
        },
        {
          value: "pdf",
          name: "pdf",
          label: "PDF",
          icon: "pdf",
        },
      ],
      selectedType: "img",
      loadStyleScript: false,
      params: {
        url: null,
        size: "1920x1080",
        fullPage: true,
        darkMode: false,
        format: "png",
        delay: 1,
        width: 1920,
        height: 1080,
        scale: 100,
        save: false,
        pdf: {
          format: "resolution",
          landscape: false,
        },
        script: "",
        style: "",
        urls: [
          {
            url: null,
          },
        ],
        keepUrlStructure: false,
      },
      imageFormats: ["png", "jpeg", "webp"],
      pdfFile: null,
      result: null,
      loading: false,
      resolutions: [
        {
          label: "Desktop",
          resolutions: [
            {
              label: "QVGA",
              value: "320x240",
            },
            {
              label: "VGA",
              value: "640x480",
            },
            {
              label: "SVGA",
              value: "800x600",
            },
            {
              label: "HD",
              value: "1280x720",
            },
            {
              label: "SXGA",
              value: "1280x1024",
            },
            {
              label: "HD+",
              value: "1600x900",
            },
            {
              label: "FHD",
              value: "1920x1080",
            },
            {
              label: "2K",
              value: "2048x1080",
            },
            {
              label: "4K UHD",
              value: "3840x2160",
            },
          ],
        },
        {
          label: "Android Devices",
          resolutions: [
            {
              label: "Galaxy S7/S7edge/S6",
              value: "320x240",
            },
            {
              label: "Galaxy S8/S8+/Note8/S9",
              value: "360x740",
            },
            {
              label: "Galaxy S10",
              value: "360x760",
            },
            {
              label: "Google Pixel, Pixel 2",
              value: "411x731",
            },
            {
              label: "Google Glass",
              value: "427x240",
            },
            {
              label: "Kindle Fire",
              value: "800x1280",
            },
          ],
        },
        {
          label: "iOS Devices",
          resolutions: [
            {
              label: "iPhone X, XS",
              value: "375x812",
            },
            {
              label: "iPhone 6+, 6s+, 7+, 8+",
              value: "414x736",
            },
            {
              label: "iPhone XR, iPhone XS Max",
              value: "414x896",
            },
            {
              label: "iPad 3, 4, Air, Air2, Pro 9.7",
              value: "768x1024",
            },
            {
              label: "iPad Pro 12.9",
              value: "1024x1366",
            },
          ],
        },
      ],
      pdfFormats: [
        "resolution",
        "A4",
        "A3",
        "A2",
        "A1",
        "A0",
        "Letter",
        "Legal",
      ],
      disableBtn: true,
      password: null,
    };
  },
  mounted() {},
  methods: {
    async generateScreenshot() {
      if (!this.loading) {
        this.loading = true;
        this.result = null;
        this.pdfFile = null;
        const selectedType = this.selectedType;
        let mimeType = "";
        const format = this.params.format;
        if (selectedType === "img") {
          mimeType = `image/${format}`;
        } else if (selectedType === "pdf") {
          mimeType = `application/pdf`;
        }

        await this.$axios
          .$post("/api/screenshot", {
            ...this.params,
            scale: this.params.scale / 100,
            size: [this.params.size],
            type: selectedType,
            mimeType,
            password: this.password,
          })
          .then(({ base64, filename, success }) => {
            const blob = new window.Blob([this.convertBase64ToBlob(base64)], {
              type: mimeType,
            });

            if (selectedType == "multiple-imgs") {
              this.download({
                url: window.URL.createObjectURL(blob),
                filename: filename,
              });
            } else {
              this.result = {
                url: window.URL.createObjectURL(blob),
                filename,
              };
            }

            if (success) {
              this.$success("Screenshot generated successfully");
            }

            this.loading = false;
          })
          .catch((error) => {
            console.log(error);
            this.loading = false;
          });
      }
    },
    download(result) {
      if (result || this.result) {
        const link = document.createElement("a");
        link.href = result.url || this.result.url;
        link.download = result.filename || this.result.filename;
        link.click();
      }
    },
    addUrl(urls) {
      urls.push({
        url: "",
      });
    },
    removeUrl(index, urls) {
      if (urls.length > 1) {
        urls.splice(index, 1);
      }
    },
    convertBase64ToBlob(base64Image) {
      // Split into two parts
      const parts = base64Image.split(";base64,");

      // Hold the content type
      const imageType = parts[0].split(":")[1];

      // Decode Base64 string
      const decodedData = window.atob(parts[1]);

      // Create UNIT8ARRAY of size same as row data length
      const uInt8Array = new Uint8Array(decodedData.length);

      // Insert all character code into uInt8Array
      for (let i = 0; i < decodedData.length; ++i) {
        uInt8Array[i] = decodedData.charCodeAt(i);
      }

      // Return BLOB image after conversion
      return new Blob([uInt8Array], { type: imageType });
    },
  },
  watch: {
    "params.size"() {
      this.params.width = parseInt(this.params.size.split("x")[0]);
      this.params.height = parseInt(this.params.size.split("x")[1]);
    },
    "params.width"() {
      this.params.size = `${this.params.width}x${this.params.height}`;
    },
    "params.height"() {
      this.params.size = `${this.params.width}x${this.params.height}`;
    },
    selectedType() {
      this.params.url = null;
      this.result = null;
      this.params.urls = [
        {
          url: null,
        },
      ];
    },
  },
};
</script>
