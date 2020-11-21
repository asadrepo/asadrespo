import axios from "axios";

class VulnerbilitiesService {

    async getVulnerbilitiesList (offset = 0, limit = 25) {
        return await axios.get(process.env.REACT_APP_API_URL+'vulnerabilities/', {
            params: {
                limit: limit,
                offset: offset
            },
            headers: {
                // Authorization:'Token 977746ca9e1fe6471aeaf7e8c708cb46226f38a1'
            }
        });
    }
}

export default VulnerbilitiesService;