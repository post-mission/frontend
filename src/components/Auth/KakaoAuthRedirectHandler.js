import { ImSpinner2 } from "react-icons/im";


const KakaoAuthRedirectHandler = () => {
    const code = new URL(window.location.href).searchParams.get('code');
    console.log(code);
    return (
    <div id="KaKaoAuthRedirectContainer">
        <ImSpinner2 className="loading-spinner" />
        <p>Loading...</p>
    </div>
    )
}

export default KakaoAuthRedirectHandler;