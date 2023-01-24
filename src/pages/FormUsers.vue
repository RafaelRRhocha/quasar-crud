<template >
  <q-page class="q-pa-md">
    <q-form
      @submit="onSubmit"
      class="column q-col-gutter-sm"
    >
      <div class="col-12 q-gutter-md">
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
          :rules="[ val => val && val.length > 0 || 'Email is missing', isValidEmail ]"
        />
      </div>

      <div class="col-12 q-gutter-sm">
        <q-btn
          label="save user"
          color="primary"
          class="float-right"
          icon="save"
          type="submit"
          unelevated
        />
        <q-btn
          label="cancel"
          color="negative"
          class="float-right"
          :to="{ name: 'home'}"
          unelevated
        />
      </div>
    </q-form>
  </q-page>
</template>
<script>
import { defineComponent, ref, onMounted } from 'vue';
import usersService from 'src/services/users';
import { useQuasar } from 'quasar';
import { useRouter, useRoute } from 'vue-router';

export default defineComponent({
  name: 'formUsers',
  setup() {
    const { post, getById, update } = usersService();
    const $q = useQuasar();
    const router = useRouter();
    const route = useRoute();
    const form = ref({
      name: '',
      email: '',
    });

    const getUserById = async (id) => {
      try {
        const response = await getById(id);
        form.value = response;
      } catch (error) {
        $q.notify({ message: error.message, color: 'negative', icon: 'info' });
      }
    };

    onMounted(async () => {
      if (route.params.id) {
        getUserById(route.params.id);
      }
    });

    const onSubmit = async () => {
      try {
        if (form.value.id) {
          await update(form.value);
          $q.notify({ message: 'Usuário atualizado com sucesso', color: 'positive', icon: 'check' });
          router.push('/');
        } else {
          await post(form.value);
          $q.notify({ message: 'Usuário cadastrado com sucesso', color: 'positive', icon: 'check' });
          router.push('/');
        }
      } catch (error) {
        $q.notify({ message: error.message, color: 'negative', icon: 'info' });
      }
    };

    const isValidEmail = (val) => {
      const emailPattern = /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
      return emailPattern.test(val) || 'Invalid email';
    };

    return {
      form,
      onSubmit,
      isValidEmail,
    };
  },
});
</script>
