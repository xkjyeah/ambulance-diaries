<template>
  <div>
    <nuxt/>
  </div>
</template>
<script>
export default {
  head: {
    link: [
      // {
      //   rel: 'stylesheet',
      //   href: 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css',
      //   integrity: 'sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u',
      //   crossorigin: 'anonymous'
      // }
    ]
  }
}
</script>
<style lang="scss">
html
{
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}
*, *:before, *:after
{
  box-sizing: border-box;
  margin: 0;
}
.button--green
{
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}
.button--green:hover
{
  color: #fff;
  background-color: #3b8070;
}
.button--grey
{
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.table.table-striped {
  border-collapse: collapse;
  tbody {
    tr:nth-child(odd) td {
      background-color: #EEE;
    }
  }
  tbody {
    tr td {
      padding: 0;
    }
    tr:hover  td {
      background-color: #DEF;
    }
  }
}
.glyphicon.glyphicon-remove:after {
  content: "❌"
}
.glyphicon.glyphicon-repeat:after {
  content: "♺"
}
.glyphicon.glyphicon-plus:after {
  content: "+"
}
</style>
