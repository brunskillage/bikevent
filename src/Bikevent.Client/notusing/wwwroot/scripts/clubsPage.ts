namespace app {
    class ClubsPage implements BvPage {

        get clubCards() {
            return $("#clubCards")
        }

        pageData: any

        async init() {
            this.addEvents()
            // this.pageData = await bvApiClient.GetClubs()
            // this.renderClubData()

        }
        addEvents() {
        }

        renderClubData() {
            var html = ""
            this.pageData.data.clubs.forEach((item: club) => {
                html += `
                <div class="clubCard">
                    <div class="nameOf"><h1>${item.nameOf}<h1></div>
                    <div class="id">id: ${item.id}</div>
                    <div class="createdOn">Created On: ${item.createdOn}</div>
                </div>
                
                `;
            })

            this.clubCards.html(html)
        }
    }

    export let clubsPage = new ClubsPage()
}