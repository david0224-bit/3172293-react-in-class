import Swal from "sweetalert2";

export function showSuccessAlert({
  title = "Éxito",
  text = "",
  confirmButtonText = "Aceptar",
  timer = 2000,
}) {
  return Swal.fire({
    icon: "success",
    title,
    text,
    confirmButtonText,
    timer,
    timerProgressBar: true,

    customClass: {
      popup: "rounded-2xl",
      title: "text-green-600",
      confirmButton:
        "bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg text-text-inverse",
      timerProgressBar: "!bg-green-600",
    },

    buttonsStyling: false,
  });
}

export function showCancelDeleteAlert({
  title = "Eliminación cancelada",
  text = "No se eliminó el registro.",
  confirmButtonText = "Aceptar",
  timer = 2000,
}) {
  return Swal.fire({
    icon: "info",
    title,
    text,
    confirmButtonText,
    timer,
    timerProgressBar: true,
    showConfirmButton: true,

    customClass: {
      popup: "rounded-2xl",
      title: "!text-blue-600",
      confirmButton:
        "bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-lg",
      timerProgressBar: "!bg-blue-600",
    },

    buttonsStyling: false,
  });
}

export function showConfirmDeleteAlert({
  title = "¿Estás seguro?",
  text = "¡No podrás revertir esta acción!",
  confirmButtonText = "Sí, eliminar",
  cancelButtonText = "No, cancelar",
}) {
  return Swal.fire({
    title,
    text,
    icon: "warning",
    showCancelButton: true,
    confirmButtonText,
    cancelButtonText,
    reverseButtons: true,

    customClass: {
      popup: "rounded-2xl",
      title: "!text-amber-600 font-bold",
      confirmButton:
        "!bg-red-600 text-white hover:bg-red-700 px-4 py-2 rounded-lg ml-2 font-medium",
      cancelButton:
        "!bg-gray-500 text-white hover:bg-gray-600 px-4 py-2 rounded-lg font-medium",
    },

    buttonsStyling: false,
  });
}

export function showOpsAlert({
  title = "Ops, hubo un error",
  text = "¡Ocurrió un fallo inesperado en el sistema!",
  confirmButtonText = "Entendido",
} = {}) {
  return Swal.fire({
    icon: "error",
    title,
    text,
    confirmButtonText,

    customClass: {
      popup: "rounded-2xl",
      title: "!text-red-600 font-bold",
      confirmButton:
        "bg-red-600 text-white hover:bg-red-700 px-4 py-2 rounded-lg font-medium",
    },

    buttonsStyling: false,
  });
}

export function showUserErrorAlert({
  title = "Error al crear usuario",
  text =
    "No se pudo registrar el usuario. Por favor, verifica que los campos estén correctos.",
}) {
  return Swal.fire({
    icon: "error",
    title,
    text,
    confirmButtonText: "Intentar de nuevo",

    customClass: {
      popup: "rounded-2xl",
      title: "!text-red-600 font-bold",
      confirmButton:
        "bg-red-600 text-white hover:bg-red-700 px-4 py-2 rounded-lg font-medium transition",
    },

    buttonsStyling: false,
  });
}