export function isEditing(): boolean {
  return window.location.search.indexOf("builder.frameEditing=") !== -1;
}
