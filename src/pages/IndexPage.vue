<template>
  <q-page padding>
    <q-table
      title="Treats"
      :rows="rows"
      :columns="columns"
      row-key="name"
    >
    <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn
            icon="delete"
            color="negative"
            dense
            size="sm"
            @:click="removePosts(props.row.id)"
          />
        </q-td>
      </template>
  </q-table>
  </q-page>
</template>

<script>
import { defineComponent, onMounted, ref } from 'vue';
import postsService from 'src/services/posts';

export default defineComponent({
  name: 'IndexPage',
  setup() {
    const { get, remove } = postsService();
    const rows = ref([]);
    const columns = [
      {
        name: 'id', label: 'Id', field: 'id', align: 'left', sortable: true,
      },
      {
        name: 'title', label: 'Title', field: 'title', align: 'left', sortable: true,
      },
      {
        name: 'author', label: 'Author', field: 'author', align: 'left', sortable: true,
      },
      {
        name: 'actions', label: 'Actions', field: 'actions', align: 'right',
      },
    ];

    const getPosts = async () => {
      try {
        const data = await get();
        rows.value = data;
      } catch (error) {
        throw new Error(error);
      }
    };

    const removePosts = async (id) => {
      try {
        await remove(id);
        await getPosts();
      } catch (error) {
        throw new Error(error);
      }
    };

    onMounted(() => {
      getPosts();
    });

    return {
      rows,
      columns,
      removePosts,
    };
  },

});
</script>
