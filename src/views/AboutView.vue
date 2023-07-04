<template>
  <div class="about">
    <h1>This is an about page</h1>
    <ul>
      <li v-permission="['add']">add</li>
      <li v-permission="['ad']">ad</li>
      <li v-permission="['delet']">delet</li>
    </ul>
  </div>
</template>
