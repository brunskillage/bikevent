
export const ClubLogo = ({ club }) => {
    return <>
        {club && <img className="shadow border" alt={"logo for " + club.nameOf} src={"/club_logo/" + club.logoImagePath} height={175} width={175} />}
        {!club && <div height={175} width={175}>Your logo</div>}
    </>
};