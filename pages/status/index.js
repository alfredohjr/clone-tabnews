import useSWR from "swr";

export default function StatusPage() {
  return (
    <>
      <h1>Status</h1>
      <Status />
    </>
  );
}

function Status() {
  const { isLoading, data } = useSWR("status", fetchStatus, {
    refreshInterval: 10000,
  });

  if (!isLoading && data) {
    const {
      updated_at,
      db_version,
      db_max_connections,
      db_current_connections,
    } = data;
    const updated_at_ptbr = new Date(updated_at).toLocaleString("pt-BR");
    return (
      <>
        <h2>Geral</h2>
        <p>
          <strong>Hora do servidor : </strong>
          {updated_at_ptbr}
        </p>

        <h2>Banco de dados</h2>
        <p>
          <strong>Versão do banco : </strong>
          {db_version}
        </p>
        <p>
          <strong>Conexões máximas : </strong>
          {db_max_connections}
        </p>
        <p>
          <strong>Conexões abertas : </strong>
          {db_current_connections}
        </p>
      </>
    );
  } else {
    return <>Carregando...</>;
  }
}

async function fetchStatus() {
  const response = await fetch("/api/v1/status");
  const json = await response.json();
  return json;
}
