<template>
    <v-dialog v-model="dialog" max-width="400">
        <v-card>
            <v-card-title class="title">Are you sure you want to remove the "{{title}}" ?</v-card-title>
            <v-card-text>This operation cannot be undone</v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn text @click="dialog = false">Cancel</v-btn>
                <v-btn color="accent" @click="remove" text>Yes</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    export default {
        name: "DialogRemove",
        data(){
            return{
                dialog: false,
                title: '',
                id: null
            }
        },
        beforeDestroy(){
            this.$root.$off('removeDialog');
        },
        mounted(){
            this.$root.$on('removeDialog', (item) => {
                this.dialog = true;
                this.id = item.id;
                this.title = item.title;
            });
        },
        methods:{
            remove(){
                this.$http.delete(this.$url + '/incident/delete/' + this.id, {
                }).then(() => {
                    this.$root.$emit('snackbar', "Incident removed", "success");
                    this.$emit('success');
                }).catch(() => {
                    this.$root.$emit('snackbar', "Server error, try again", "error");
                    this.$emit('cancel');
                }).finally(() => {
                    this.dialog = false;
                });
            }
        }
    }
</script>

<style scoped>

</style>
