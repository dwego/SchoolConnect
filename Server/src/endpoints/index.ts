import axios from "axios";
import chokidar from "chokidar";
import { exec } from "child_process";

export const api = axios.create({
  baseURL: "http://localhost:8000/",
});

export class Endpoints {
  public static async email() {
    const { data } = await api.get("/api/data.json");
    return data;
  }
}

chokidar.watch("api/data.json").on("change", () => {
  restartServer();
});

function restartServer() {
  const command = "yarn dev";
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Erro ao reiniciar o servidor: ${error}`);
      return;
    }
    console.log(`Servidor reiniciado com sucesso.`);
  });
}
