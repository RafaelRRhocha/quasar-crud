<template>
  <q-page padding>
    <q-table
      title="Users"
      :rows="rows"
      :columns="columns"
      row-key="name"
    >
    <template v-slot:top>
      <h5 class="text-h5 text-weight-medium q-my-sm">Users</h5>
      <q-space />
      <q-btn color="positive" :disable="loading" label="new user" :to="{ name: 'formUsers'}" />
    </template>
    <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn
            icon="delete"
            color="negative"
            dense
            size="sm"
            @:click="removeUser(props.row.id)"
          />
        </q-td>
      </template>
  </q-table>
  </q-page>
</template>

<script>
import { defineComponent, onMounted, ref } from 'vue';
import usersService from 'src/services/users';
import { useQuasar } from 'quasar';

export default defineComponent({
  name: 'IndexPage',
  setup() {
    const { get, remove } = usersService();
    const rows = ref([]);
    const columns = [
      {
        name: 'id', label: 'Id', field: 'id', align: 'left', sortable: true,
      },
      {
        name: 'name', label: 'Name', field: 'name', align: 'left', sortable: true,
      },
      {
        name: 'email', label: 'Email', field: 'email', align: 'left', sortable: true,
      },
      {
        name: 'actions', label: 'Actions', field: 'actions', align: 'right',
      },
    ];
    const $q = useQuasar();

    const getUsers = async () => {
      try {
        const data = await get();
        rows.value = data;
      } catch (error) {
        $q.notify({ message: error, color: 'negative', icon: 'info' });
      }
    };

    const removeUser = async (id) => {
      try {
        $q.dialog({
          title: 'Remover Usuário',
          message: 'Deseja remover esse usuário?',
        }).onOk(async () => {
          await remove(id);
          $q.notify({ message: 'Usuário removido com sucesso!', color: 'positive', icon: 'check' });
          await getUsers();
        });
      } catch (error) {
        $q.notify({ message: error, color: 'negative', icon: 'info' });
      }
    };

    onMounted(() => {
      getUsers();
    });

    return {
      rows,
      columns,
      removeUser,
    };
  },

});
</script>
