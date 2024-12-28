import { useEffect } from "react"
import { PageContainer } from "../partials/wrappers/pageContainer"
import { PageTitle } from "../partials/wrappers/pageTitle"
import { SubMenu } from "../partials/wrappers/subMenu"
import { globaldispatch } from "../lib/globalHooks"
import { setLatestRides } from "../store/thunks"
import { useSelector } from "react-redux"
import { LoadingA } from "../partials/wrappers/loading"
import { Table } from "react-bootstrap"
import { RideListItem } from "../partials/rideListItem"
export const WhatsHappening = () => {
    var rides = useSelector(state => state.queries.latestRides)
    var util = useSelector(state => state.util)

    useEffect(() => {
        globaldispatch(setLatestRides())
    }, [])

    return <>
        <div className='eventPage'>

            <PageTitle >Whats Happening</PageTitle>
            <SubMenu>
                This is the Submenu
            </SubMenu>
            <PageContainer>
                <LoadingA isLoading={util?.loading}></LoadingA>
                {!util?.loading && rides && rides.length ? <>
                    <div className='rides'>
                        <Table className='table-responsive align-middle' size="sm">
                            {/* <table className="table table-responsive align-middle"> */}
                            <thead>
                                <tr>
                                    <th>When</th>
                                    <th>More</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {rides.map(ride => {
                                    return <RideListItem key={ride.id} {...ride}></RideListItem>
                                })}
                            </tbody>


                        </Table>

                    </div>
                </> : <>
                    <p>No ridea found</p>
                </>}
            </PageContainer>
        </div >
    </>
}