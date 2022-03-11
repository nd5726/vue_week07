export default function (title, icon = 'success', content = '') {
  this.$swal.fire({
    title: title,
    text: content,
    icon: icon,
    confirmButtonText: '確定'
  })
}
