<script setup>
defineProps({
  msg: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <div class='zmanim'>
    <h2 class='title'>Zmanim:</h2>
    <table class="table table-striped">
      <thead>
        <tr>
          <th>Zman</th>
          <th>Time</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Alos HaShachar (m"a)</td>
          <td>6:04 am</td>
        </tr>

        <tr>
          <td>Earliest Time for Tallis (m"a)</td>
          <td>6:36 am</td>
        </tr>

        <tr>
          <td>HaNetz HaChama</td>
          <td>7:29 am</td>
        </tr>

        <tr>
          <td>Sof Zman Krias Shema (m"a)</td>
          <td>9:10 am</td>
        </tr>

        <tr>
          <td>Sof Zman Tefillah (m"a)</td>
          <td>10:12 am</td>
        </tr>

        <tr>
          <td>Sof Zman Krias Shema (gr"a)</td>
          <td>9:52 am</td>
        </tr>

        <tr>
          <td>Sof Zman Tefillah (gr"a)</td>
          <td>10:40 am</td>
        </tr>

        <tr>
          <td>Chatzos</td>
          <td>12:16 pm</td>
        </tr>

        <tr>
          <td>Mincha Gedola (m"a)</td>
          <td>12:40 pm</td>
        </tr>

        <tr>
          <td>Mincha Ketana (gr"a)</td>
          <td>3:04 pm</td>
        </tr>

        <tr>
          <td>Plag Mincha (m"a)</td>
          <td>4:04 pm</td>
        </tr>

        <tr>
          <td>Shkia</td>
          <td>5:03 pm</td>
        </tr>

        <tr>
          <td>Tzeis 595° (gr"a)</td>
          <td>5:33 pm</td>
        </tr>

        <tr>
          <td>Tzeis 850°</td>
          <td>5:47 pm</td>
        </tr>

        <tr>
          <td>Tzeis Hakochavim (42 minutes)</td>
          <td>5:45 pm</td>
        </tr>

        <tr>
          <td>Tzeis Hakochavim (72 minutes)</td>
          <td>6:15 pm</td>
        </tr>

      </tbody>
    </table>
  </div>

</template>