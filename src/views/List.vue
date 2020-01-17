<template>
    <v-container grid-list-md>
        <v-flex md12 xs12 sm12>
            <h5 class="headline">INCIDENTS</h5>
        </v-flex>
        <v-layout row wrap>
            <v-flex md12 xs12 sm12>
                <v-card class="pa-4">
                    <v-container fluid>
                        <v-simple-table>
                            <template v-slot:default>
                                <thead>
                                <tr>
                                    <th class="text-left">ID</th>
                                    <th class="text-left">TITLE</th>
                                    <th class="text-left">DESCRIPTION</th>
                                    <th class="text-left">CRITICALITY</th>
                                    <th class="text-left">TYPE</th>
                                    <th class="text-left">STATUS</th>
                                    <th class="text-left">OPTIONS</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr v-for="incident in incidents" :key="incident.id">
                                    <td>{{ incident.id }}</td>
                                    <td>{{ incident.title }}</td>
                                    <td>{{ incident.description }}</td>
                                    <td><v-chip small class="ma-2">{{ incident.criticality }}</v-chip></td>
                                    <td>{{ incident.type }}</td>
                                    <td>
                                        <v-chip small :color="incident.status === 'aberto' ? 'green' : 'red'" class="ma-2">{{ incident.status }}</v-chip>
                                    </td>
                                    <td>
                                        <v-btn @click="$router.push('edit/' + incident.id)" fab x-small><v-icon>edit</v-icon></v-btn>
                                        <v-btn @click="$root.$emit('removeDialog', incident)" class="ml-2" fab x-small><v-icon>delete</v-icon></v-btn>
                                    </td>
                                </tr>
                                </tbody>
                            </template>
                        </v-simple-table>
                        <dialog-remove @success="getIncidents"/>
                    </v-container>
                </v-card>
            </v-flex>
        </v-layout>

    </v-container>
</template>

<script>
    import DialogRemove from "./DialogRemove";
    export default {
        name: "List",
        components: {DialogRemove},
        data() {
            return {
                incidents: []
            }
        },
        mounted() {
            this.getIncidents();
        },
        methods: {
            getIncidents() {
                this.$http.get(this.$url + "/incidents").then((response) => {
                    this.incidents = response.data;
                }).catch(() => {
                    this.$root.$emit("snackbar", "Server error", "error");
                })
            }
        }
    }
</script>

<style scoped>

</style>
