namespace app {

    enum HttpMethod {
        GET = "GET",
        POST = "POST",
        DELETE = "DELETE",
        PUT = "PUT",
        PATCH = "PATCH",
    }

    class ApiClient {

        async Makerequest(method: HttpMethod, url: string, data?: any) {

            let body;
            let queryString;
            let fullUrl = url;

            switch (method) {
                case HttpMethod.DELETE:
                case HttpMethod.GET: {
                    if (data) fullUrl = `${url}${$.serialize(data)}`
                }
                case HttpMethod.PATCH:
                case HttpMethod.PUT:
                case HttpMethod.POST: {
                    if (data) body = JSON.stringify(data)
                }
            }

            var res = await fetch(fullUrl, {
                method: method.toString(),
                body: body,
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                }
            })

            return res.json();
        }

        Post = async (url: string, data: any) => {
            return await this.Makerequest(HttpMethod.POST, url, data)
        }

        Login = async (data: any) => {
            return await this.Makerequest(HttpMethod.POST, "api/v1/login", data)
        }

        CreateAccount = async (data: any) => {
            return await this.Makerequest(HttpMethod.POST, "api/v1/account", data)
        }

        GetClubs = async (args: any) => {
            return await this.Makerequest(HttpMethod.GET, "api/v1/clubs")
        }

        AddClub = async (club: club) => {
            return await this.Makerequest(HttpMethod.POST, "api/v1/club", club)
        }

        RemoveClub = async (club: club) => {
            return await this.Makerequest(HttpMethod.DELETE, "api/v1/club", club)
        }

        UpdateClub = async (club: club) => {
            return await this.Makerequest(HttpMethod.PATCH, "api/v1/club", club)
        }

        // Rides
        GetRides = async (args: any) => {
            return await this.Makerequest(HttpMethod.GET, "api/v1/rides")
        }

        AddRide = async (ride: ride) => {
            return await this.Makerequest(HttpMethod.POST, "api/v1/ride", ride)
        }

        RemoveRide = async (ride: ride) => {
            return await this.Makerequest(HttpMethod.DELETE, "api/v1/ride", ride)
        }

        UpdateRide = async (ride: ride) => {
            return await this.Makerequest(HttpMethod.PATCH, "api/v1/ride", ride)
        }

        // Rides
        GetEvents = async (queryParams: any = null) => {
            return await this.Makerequest(HttpMethod.GET, "api/v1/events", queryParams)
        }

        AddEvent = async (event: bvEvent) => {
            return await this.Makerequest(HttpMethod.POST, "api/v1/event", event)
        }

        RemoveEvent = async (event: bvEvent) => {
            return await this.Makerequest(HttpMethod.DELETE, "api/v1/event", event)
        }

        UpdateEvent = async (event: bvEvent) => {
            return await this.Makerequest(HttpMethod.PATCH, "api/v1/event", event)
        }
    }


    export let bvApiClient = new ApiClient()
}