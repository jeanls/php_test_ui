<template>
    <v-app id="inspire">
        <v-navigation-drawer v-model="drawer" app>
            <v-list style="padding: 0">
                <v-list-item style="height: 64px;background-color: #1867c0;" class="text--white">
                    <v-list-item-content>
                        <v-list-item-title class="title" style="color: white">PHP Test</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-divider></v-divider>
                <v-list-item @click="$router.push('/new').catch(err => {})">
                    <v-list-item-action>
                        <v-icon>add</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>Create new</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item @click="$router.push('/list').catch(err => {})">
                    <v-list-item-action>
                        <v-icon>list</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>List all</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
        <v-app-bar app color="primary" dark>
            <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
            <v-toolbar-title>{{titleBar}}</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-menu transition="scroll-y-transition" left bottom>
                <template v-slot:activator="{ on }">
                    <v-btn icon v-on="on">
                        <v-icon>mdi-dots-vertical</v-icon>
                    </v-btn>
                </template>
            </v-menu>
            <v-progress-linear :active="inRequest" :indeterminate="true" absolute bottom color="white" height="5"
                               reactive></v-progress-linear>
        </v-app-bar>
        <v-content>
            <v-snackbar v-model="snackbar" :color="snackBarConfig.type" :right="true" :timeout="snackBarConfig.timeout"
                        :top="true">
                {{snackBarConfig.msg}}
                <v-btn dark text @click="snackbar = false">Close</v-btn>
            </v-snackbar>
            <router-view/>
        </v-content>
        <v-content>
            <!--Footer-->
            <v-footer padless absolute class="font-weight-small" max-height="50px">
                <div class="flex-grow-1"></div>
                <v-col class="text-center" cols="12">
                    <strong>Jean &copy; 2020</strong>
                </v-col>
            </v-footer>
            <!--End Footer-->
        </v-content>
        <v-overlay z-index="10" absolute :value="inRequest">
            <v-progress-circular :size="70" :width="7" color="white" :opacity="0.90" indeterminate>
            </v-progress-circular>
        </v-overlay>

    </v-app>
</template>

<script>
    export default {
        name: "MainTemplate",
        components: {},
        data() {
            return {
                drawer: null,
                titleBar: "",
                inRequest: false,
                overlay: true,
                snackbar: false,
                snackBarConfig: {
                    type: "",
                    timeout: 10000,
                    msg: ""
                }
            }
        },
        mounted() {
            this.$store.watch(
                (state, getters) => getters.getRequest,
                newValue => {
                    this.inRequest = newValue;
                }
            );
            this.$root.$on("snackbar", (msg = "", type = "", timeout = 10000) => {
                this.snackBarConfig.type = type;
                this.snackBarConfig.msg = msg;
                this.snackBarConfig.timeout = timeout;
                this.snackbar = true;
            });
        },
        created() {
            this.$root.$on("titleBar", (title) => {
                this.titleBar = title;
            });
        }
    }
</script>

<style scoped>

</style>
