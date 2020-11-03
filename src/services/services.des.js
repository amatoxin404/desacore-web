import axios from "axios";

const BASE_API_URL = "http://traz.desacireundeucilograng.web.id/";

class WebdesServices {
  getAllIdentifikasi() {
    return axios.get(BASE_API_URL + "des1");
  }

  postIdentifikasi(dataIdentifikasi) {
    return axios.post(BASE_API_URL + "des1", dataIdentifikasi);
  }

  getIdentifikasi(rnid) {
    return axios.get(BASE_API_URL + `des1/${rnid}`);
  }

  putIdentifikasi(updateIdentifikasi) {
    return axios.put(BASE_API_URL + "des1", updateIdentifikasi);
  }

  delIdentifikasi(rnid) {
    return axios.delete(BASE_API_URL + `des1/${rnid}`);
  }

  getAllLembaga() {
    return axios.get(BASE_API_URL + "des2");
  }

  postLembaga(dataLembaga) {
    return axios.post(BASE_API_URL + "des2", dataLembaga);
  }

  getLembaga(rnid) {
    return axios.get(BASE_API_URL + `des2/${rnid}`);
  }

  putLembaga(updateLembaga) {
    return axios.put(BASE_API_URL + "des2", updateLembaga);
  }

  delLembaga(rnid) {
    return axios.delete(BASE_API_URL + `des2/${rnid}`);
  }

  getAllProfil() {
    return axios.get(BASE_API_URL + "des3");
  }

  postProfil(dataProfil) {
    return axios.post(BASE_API_URL + "des3", dataProfil);
  }

  getProfil(rnid) {
    return axios.get(BASE_API_URL + `des3/${rnid}`);
  }

  putProfil(updateProfil) {
    return axios.put(BASE_API_URL + "des3", updateProfil);
  }

  delProfil(rnid) {
    return axios.delete(BASE_API_URL + `des3/${rnid}`);
  }

  getAllSejarah() {
    return axios.get(BASE_API_URL + "des4");
  }

  getSejarah(rnid) {
    return axios.get(BASE_API_URL + `des4/${rnid}`);
  }

  putSejarah(updateSejarah) {
    return axios.put(BASE_API_URL + "des4", updateSejarah);
  }

  postSejarah(dataSejarah) {
    return axios.post(BASE_API_URL + "des4", dataSejarah);
  }

  delSejarah(rnid) {
    return axios.delete(BASE_API_URL + `des4/${rnid}`);
  }

  getAllStruktur() {
    return axios.get(BASE_API_URL + "des5");
  }

  postStruktur(dataStruktur) {
    return axios.post(BASE_API_URL + "des5", dataStruktur);
  }

  getStruktur(rnid) {
    return axios.get(BASE_API_URL + `des5/${rnid}`);
  }

  putStruktur(updateStruktur) {
    return axios.get(BASE_API_URL + "des5", updateStruktur);
  }

  delStruktur(rnid) {
    return axios.delete(BASE_API_URL + `des5/${rnid}`);
  }

  getAllVM() {
    return axios.get(BASE_API_URL + "des6");
  }

  postVM(dataVM) {
    return axios.post(BASE_API_URL + "des6", dataVM);
  }

  getVM(rnid) {
    return axios.get(BASE_API_URL + `des6/${rnid}`);
  }

  putVM(updateVm) {
    return axios.put(BASE_API_URL + "des6", updateVm);
  }

  delVM(rnid) {
    return axios.delete(BASE_API_URL + `des6/${rnid}`);
  }

  getAllPeta() {
    return axios.get(BASE_API_URL + "des7");
  }

  postPeta(dataPeta) {
    return axios.post(BASE_API_URL + "des7", dataPeta);
  }

  getPeta(ptid) {
    return axios.get(BASE_API_URL + `des7/${ptid}`);
  }

  putPeta(updatePeta) {
    return axios.put(BASE_API_URL + "des7", updatePeta);
  }

  delPeta(rnid) {
    return axios.delete(BASE_API_URL + `des7/${rnid}`);
  }

  getAllSaran() {
    return axios.get(BASE_API_URL + "saran");
  }

  postSaran(dataSaran) {
    return axios.post(BASE_API_URL + "saran", dataSaran);
  }

  getSaran(rnid) {
    return axios.get(BASE_API_URL + `saran/${rnid}`);
  }

  putSaran(updateSaran) {
    return axios.put(BASE_API_URL + "saran", updateSaran);
  }
}

export default new WebdesServices();
