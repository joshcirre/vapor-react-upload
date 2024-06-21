import axios from 'axios';
import Vapor from 'laravel-vapor'
window.axios = axios;
window.Vapor = Vapor;
Vapor.withBaseAssetUrl(import.meta.env.VITE_VAPOR_ASSET_URL);

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
