<template>
    <v-container grid-list-md>
        <v-flex md12 xs12 sm12>
            <h5 class="headline">Create new</h5>
        </v-flex>
        <v-layout row wrap>
            <v-flex md12 xs12 sm12>
                <v-card class="pa-4">
                    <v-container fluid>
                        <v-row md12 xs12 sm12>
                            <v-flex xs12 md12>
                                <v-text-field :success="incident.title.length > 0" :error="!incident.title"
                                              v-model="incident.title" label="Title"
                                              required></v-text-field>
                            </v-flex>
                            <v-flex xs12 md12>
                                <v-textarea
                                        :success="incident.description.length > 0"
                                        :error="!incident.description"
                                        required
                                        name="input-7-1"
                                        label="Description"
                                        v-model="incident.description">
                                </v-textarea>
                            </v-flex>
                        </v-row>
                        <v-row>
                            <v-flex xs12 md4>
                                <v-select
                                        :success="incident.criticality.length > 0"
                                        :error="!incident.criticality"
                                        v-model="incident.criticality"
                                        :items="criticalities"
                                        label="Criticality"
                                ></v-select>
                            </v-flex>
                            <v-flex xs12 md4>
                                <v-select
                                        :success="incident.type.length > 0"
                                        :error="!incident.type"
                                        v-model="incident.type"
                                        :items="types"
                                        label="Type"
                                ></v-select>
                            </v-flex>
                            <v-flex xs12 md4>
                                <v-select
                                        :success="incident.status.length > 0"
                                        :error="!incident.status"
                                        v-model="incident.status"
                                        :items="status"
                                        label="Status"
                                ></v-select>
                            </v-flex>
                        </v-row>
                        <v-layout>
                            <v-flex md12 sm12 xs12>
                                <v-btn @click="save" color="primary" class="float-right" small>Save</v-btn>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    export default {
        name: "New",
        data() {
            return {
                incident: {
                    title: '',
                    description: '',
                    criticality: 'alta',
                    type: 'ataque brute force',
                    status: 'aberto'
                },
                criticalities: ['alta', 'media', 'baixa'],
                types: ['ataque brute force', 'credenciais vazadas', 'ataque ddos', 'atividades anormais de usuários'],
                status: ['aberto', 'fechado']
            }
        },
        methods: {
            save() {
                this.$http.post(this.$url + "/incident/save", {
                    title: this.incident.title,
                    description: this.incident.description,
                    criticality: this.incident.criticality,
                    type: this.incident.type,
                    status: this.incident.status
                }).then(() => {
                    this.$root.$emit("snackbar", "Successful", "success")
                    this.$router.push('/');
                }).catch((error) => {
                    if (error.response.data.errors) {
                        let msg = '';
                        error.response.data.errors.forEach((err) => {
                            msg += err.message;
                            msg += ' ';
                        });
                        this.$root.$emit("snackbar", msg, "error");
                    } else if (error.response.data.message) {
                        this.$root.$emit("snackbar", error.response.data.message, "error");
                    } else {
                        this.$root.$emit("snackbar", "Server error", "error")
                    }
                })
            }
        }
    }
</script>

<style scoped>

</style>
