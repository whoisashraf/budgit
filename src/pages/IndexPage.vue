<template>
  <q-page>
    <div class="q-pa-md text-weight-bold">

      <q-list bordered separator v-for="entry in entries" :key="entry.id">

        <q-slide-item @right="onEntrySlideRight($event, entry.id)" right-color="negative">
          <template v-slot:right>

            <q-icon name="delete" />
          </template>

          <q-item>
            <q-item-section :class="useColorise(entry.amount)">
              {{ entry.name }}
            </q-item-section>

            <q-item-section side :class="useColorise(entry.amount)">
              {{ useCurrencify(entry.amount) }}
            </q-item-section>
          </q-item>
        </q-slide-item>



      </q-list>
    </div>

    <q-footer elevated class="bg-transparent text-white">
      <q-form @submit="addEntry">
        <div class="row q-mb-sm q-pa-sm text-grey-7 text-h6">
          <div class="col">Balance: </div>
          <div class="col text-right" :class="useColorise(balance)">{{ useCurrencify(balance) }}</div>
        </div>
        <div class="row q-pa-sm items-center q-col-gutter-sm bg-primary ">
          <div class="col">
            <q-input outlined bg-color="white" placeholder="Name" dense v-model="addEntryForm.name" ref="nameRef" />
          </div>
          <div class="col-4">
            <q-input outlined bg-color="white" placeholder="Amount" dense input-class="text-right" step="0.01"
              type="number" v-model.number="addEntryForm.amount" />

          </div>
          <div class="col-2 col-md-1">
            <q-btn round color="primary" icon="add" type="submit" />
          </div>
        </div>
      </q-form>
    </q-footer>
  </q-page>
</template>

<script setup>
import { uid } from 'quasar';
import useColorise from 'src/use/useColorise';
import useCurrencify from 'src/use/useCurrencify';
import { ref, computed, reactive, onMounted } from 'vue';
import { useQuasar } from 'quasar'

const $q = useQuasar()

const entries = ref([])

onMounted(() => {

  const stored_data = $q.localStorage.getItem("data")
  if (stored_data) {
    entries.value = stored_data
  }
})


const nameRef = ref(null)



const balance = computed(() => {
  return entries.value.reduce((acc, { amount }) => {
    return acc + amount
  }, 0)
})

const addEntryForm = reactive({
  name: '',
  amount: null
})

const addEntry = () => {
  const newEntry = {
    id: uid(),
    name: addEntryForm.name,
    amount: addEntryForm.amount
  }
  entries.value.push(newEntry)
  // reset form input and refocus input
  addEntryForm.name = ""
  addEntryForm.amount = null
  nameRef.value.focus()
  try {
    $q.localStorage.set("data", entries.value)
  } catch (error) {
    console.log(error);
  }
}

const onEntrySlideRight = (_, entryId) => {
  // remove entry
  const index = entries.value.findIndex(entry => entry.id === entryId)
  entries.value.splice(index, 1)
  try {
    $q.localStorage.set("data", entries.value)
  } catch (error) {
    console.log(error);
  }

}
</script>
