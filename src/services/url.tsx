const getAppUrl = () => {
  const { protocol, hostname, port } = window.location;
  return `${protocol}//${hostname}:${port}`;
};

export const urlBase = `${getAppUrl()}`;