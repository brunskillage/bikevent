module app {

    enum HttpMethod {
        GET = "GET",
        POST = "POST",
        DELETE = "DELETE",
        PUT = "PUT",
        PATCH = "PATCH",
    }

    class ApiClient {

        async Makerequest(method: HttpMethod, url: string, data?: any,) {
            var res = await fetch(url, {
                method: method.toString(),
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                    "Authorization": "TBC"
                }
            })

            return res.json();
        }

        GetClubs = async () => {
            var res = await this.Makerequest(HttpMethod.GET, "api/v1/clubs")
            return res;
        }

        AddClub = async (club: club) => {
            var res = await this.Makerequest(HttpMethod.POST, "api/v1/club", club)
            return res;
        }

    }


    export let bvApiClient = new ApiClient()
}