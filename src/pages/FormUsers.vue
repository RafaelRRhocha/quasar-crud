<template >
  <q-page class="q-pa-md" style="max-width: 400px">
    <q-form
      @submit="onSubmit"
      @reset="onReset"
      class="column q-col-glutter-sm"
    >
      <div class="col-12 q-glutter-sm">
        <q-input
          outlined
          v-model="form.name"
          label="Name"
          lazy-rules
          class="col-lg-6 col-xs-12"
          :rules="[ val => val && val.length > 0 || 'Please type something' ]"
        />

        <q-input
          outlined
          v-model="form.email"
          label="Email"
          lazy-rules
          class="col-lg-6 col-xs-12"
          :rules="[ val => val && val.length > 0 || 'Please type something' ]"
        />
      </div>

      <div class="col-12 q-glutter-sm">
        <q-btn
          label="save user"
          color="primary"
          class="float-right"
          icon="save"
          type="submit"
        />
        <q-btn
          label="cancel"
          color="white"
          class="float-right"
          text-color="dark"
          :to="{ name: 'home' }"
        />
      </div>
    </q-form>
  </q-page>
</template>
<script>
import { defineComponent, ref } from 'vue';
import usersService from 'src/services/users';
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'formUsers',
  setup() {
    const { post } = usersService();
    const $q = useQuasar();
    const route = useRouter();
    const form = ref({
      name: '',
      email: '',
    });

    const onSubmit = async () => {
      try {
        await post(form.value);
        $q.notify({ message: 'successfully registered user', color: 'positive', icon: 'check' });
        route.push({ name: 'home' });
      } catch (error) {
        $q.notify({ message: error.message, color: 'negative', icon: 'info' });
      }
    };

    return {
      form,
      onSubmit,
    };
  },
});
</script>
