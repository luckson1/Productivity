import React, { useEffect } from 'react'
import productivity from '../assets/productivity.svg'
import todo from '../assets/todo.svg'

import { useStateContext } from '../context/ContextProvider'
import { Link } from 'react-router-dom'
import { Authmodal } from '../components/users/Authmodal'
import { MdClose, MdMenu } from 'react-icons/md'
import {  useSelector, useDispatch} from 'react-redux'
import {  logout } from '../redux/usersSlices';



function Home() {


  const { setActiveMenu, setShowNavBar, showModal, setShowModal, setIsSignUp, isOpenMenu, setIsOpenMenu } = useStateContext()
  useEffect(() => {
    setActiveMenu(false); setShowNavBar(false)
  }, [setActiveMenu, setShowNavBar])
const dispatch=useDispatch()
  const userLogin = useSelector(state => state?.users?.userAuth);
  return (
    <div >

      <div className="leading-normal tracking-normal text-white gradient" >

        <nav id="header" className="fixed w-full z-30 top-0 text-white">
          <div className="w-full mx-auto flex flex-wrap items-center justify-between mt-0 py-2 bg-white">
            <div className="pl-4 flex items-center">
            </div>
            <div className="block lg:hidden pr-4">
              <button onClick={() => setIsOpenMenu(!isOpenMenu)}
                id="nav-toggle" className="flex items-center p-1 text-gray-900 hover:text-gray-900 focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">

                {isOpenMenu ? <MdClose /> : <MdMenu />}

              </button>
            </div>
            <div className={`w-full flex-grow md:flex md:items-center md:w-auto ${isOpenMenu ? "" : "hidden"} mt-2 md:mt-0 bg-white  text-black p-4 md:p-0 z-10" `}>
              <ul class="list-reset md:flex  flex-1 items-center ">
                <li className=" mr-96 md:mr-3  ">
                  <Link onClick={() => setIsOpenMenu(!isOpenMenu)}
                    className="inline-block  py-2 px-4 text-black font-bold no-underline " to="/">Home</Link>
                </li>
                <li className="mr-96 md:mr-3 ">
                  <Link onClick={() => setIsOpenMenu(!isOpenMenu)}
                    className="inline-block text-black no-underline hover:text-gray-900 hover:text-underline py-2 px-4" to="/">Features</Link>
                </li>
                <li className="mr-96 md:mr-3 ">
                  <Link onClick={() => setIsOpenMenu(!isOpenMenu)}
                    className="inline-block text-black no-underline hover:text-gray-900 hover:text-underline py-2 px-4" to="/">Resources</Link>
                </li>
               {userLogin && <li className="mr-96 md:mr-3 ">
                  <Link onClick={() => {setIsOpenMenu(!isOpenMenu);setActiveMenu(true); setShowNavBar(true)}}
                    className="inline-block text-black no-underline hover:text-gray-900 hover:text-underline py-2 px-4" to="/dashboard">Dashboard</Link>
                </li>}
              </ul>
              <button
                id="nav Start Free Trial"
                className="mx-auto mr-96 lg:mx-0 hover:underline bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 text-gray-900 font-bold rounded-full mt-4 lg:mt-0 py-4 px-8 shadow opacity-75 focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out"
                onClick={ userLogin? ()=> dispatch(logout()):() =>  { setShowModal(true); setIsSignUp(false); setIsOpenMenu(false); window.scrollTo(0, 0) }}
              >
              { userLogin? "Logout": "Login"}
              </button>
            </div>
          </div>
          <hr className="border-b border-gray-100 opacity-25 my-0 py-0" />
        </nav>

        <div className="pt-24 bg-gradient-to-r from-indigo-200  text-gray-900  ">
          <div className="container px-3 mx-auto flex flex-wrap  flex-col md:flex-row items-center">

            <div className="flex flex-col w-full md:w-2/5 justify-center items-start text-center md:text-left">
              <p className="uppercase tracking-loose w-full " >Tools for For your life's work</p>
              <h1 className="my-4 text-5xl font-bold leading-tight text-green-900" >
                Increase your productivity by 10x
              </h1>
              <p className="leading-normal text-2xl mb-8" >
                One workspace for your work and personal milestones.
              </p>

            { !userLogin && <button onClick={() => {setShowModal(true); window.scrollTo(0, 0)}}
                className="mx-auto lg:mx-0 hover:underline bg-white text-gray-900 font-bold rounded-full mt-6 mb-16 py-4 px-8 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">
                Sign Up
              </button>}
            </div>

            <div className="w-full md:w-3/5 py-5 text-center">

              <svg xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" width="430.34637" height="484.99856" viewBox="0 0 882.34637 783.99856" xmlnsXlink="http://www.w3.org/1999/xlink"><title>remotely</title><path d="M501.18877,80.56067l3.46953-5.362a80.3872,80.3872,0,0,0-3.55952-8.33251l-2.24352,1.81205,1.77642-2.74534c-1.69294-3.3325-3.02505-5.43215-3.02505-5.43215s-6.95827,10.96511-9.283,22.57466l4.45222,6.88072-4.9288-3.981a32.52249,32.52249,0,0,0-.27041,4.0782c0,13.74959,4.49056,24.89583,10.03,24.89583s10.03-11.14624,10.03-24.89583a42.818,42.818,0,0,0-2.29454-12.84723Z" transform="translate(-158.82681 -60.50072)" fill="#e6e6e6" /><path d="M525.74665,92.48079l6.24485-1.33818a80.386,80.386,0,0,0,3.375-8.40894l-2.86772-.30508,3.19738-.68514c1.15933-3.55352,1.70207-5.98014,1.70207-5.98014s-12.67374,2.83326-22.52676,9.39864l-1.71721,8.01359-.67022-6.30016a32.52414,32.52414,0,0,0-3.07493,2.69252c-9.72242,9.72242-14.4287,20.77932-10.51174,24.69627s14.97385-.78932,24.69627-10.51174a42.81769,42.81769,0,0,0,7.46188-10.70686Z" transform="translate(-158.82681 -60.50072)" fill="#e6e6e6" /><path d="M528.02764,145.68472c-14.48118.92631-30.25994-.05387-47.04589,0V107.25287c14.79122,2.30262,30.56472,2.06615,47.04589,0Z" transform="translate(-158.82681 -60.50072)" fill="#e6e6e6" /><path d="M631.62843,175.65222l2.26263-3.49679a52.42392,52.42392,0,0,0-2.32132-5.434l-1.46308,1.18172,1.15847-1.79036c-1.104-2.17326-1.97276-3.54253-1.97276-3.54253a50.2414,50.2414,0,0,0-6.05381,14.72187l2.90347,4.4872-3.21427-2.59615a21.20987,21.20987,0,0,0-.17635,2.65956c0,8.96667,2.92849,16.2356,6.541,16.2356s6.541-7.26893,6.541-16.2356a27.92338,27.92338,0,0,0-1.49636-8.37821Z" transform="translate(-158.82681 -60.50072)" fill="#e6e6e6" /><path d="M647.64364,183.42582l4.07252-.87269a52.42092,52.42092,0,0,0,2.201-5.48381l-1.87016-.199,2.08514-.44681c.756-2.31739,1.11-3.89989,1.11-3.89989a50.241,50.241,0,0,0-14.69062,6.12924l-1.11987,5.226-.43707-4.10859a21.20826,21.20826,0,0,0-2.00529,1.7559c-6.3404,6.34039-9.40955,13.55105-6.85515,16.10546s9.76507-.51475,16.10546-6.85515a27.92314,27.92314,0,0,0,4.8662-6.98238Z" transform="translate(-158.82681 -60.50072)" fill="#e6e6e6" /><path d="M649.13117,218.12229c-9.44378.60408-19.73376-.03513-30.68057,0v-25.063a110.58424,110.58424,0,0,0,30.68057,0Z" transform="translate(-158.82681 -60.50072)" fill="#e6e6e6" /><path d="M643.29962,292.39872c-8.33889.53341-17.425-.031-27.091,0V270.268a97.6466,97.6466,0,0,0,27.091,0Z" transform="translate(-158.82681 -60.50072)" fill="#e6e6e6" /><rect x="167.50834" y="82.48131" width="364.54703" height="10.18288" fill="#e6e6e6" /><rect x="167.50834" y="154.77974" width="364.54703" height="10.18288" fill="#e6e6e6" /><rect x="167.50834" y="227.07818" width="364.54703" height="10.18288" fill="#e6e6e6" /><circle cx="470.9581" cy="197.54783" r="20.36576" fill="#e6e6e6" /><circle cx="470.9581" cy="197.54783" r="16.2926" fill="#fff" /><circle cx="470.9581" cy="197.54783" r="4.07315" fill="#e6e6e6" /><rect x="634.87636" y="249.90225" width="2.03658" height="16.2926" transform="translate(735.11638 -438.34681) rotate(90)" fill="#e6e6e6" /><rect x="628.76663" y="243.79252" width="2.03658" height="16.2926" transform="translate(1100.74302 443.37693) rotate(180)" fill="#e6e6e6" /><rect x="339.72544" y="105.10421" width="13.47506" height="53.33878" fill="#e6e6e6" /><rect x="339.72544" y="113.52612" width="13.47506" height="6.17607" fill="#ccc" /><rect x="339.72544" y="140.47624" width="13.47506" height="6.17607" fill="#ccc" /><rect x="318.95139" y="105.10421" width="13.47506" height="53.33878" fill="#e6e6e6" /><rect x="318.95139" y="113.52612" width="13.47506" height="6.17607" fill="#ccc" /><rect x="318.95139" y="140.47624" width="13.47506" height="6.17607" fill="#ccc" /><rect x="522.69507" y="165.60493" width="13.47506" height="53.33878" transform="translate(-189.17144 194.36555) rotate(-26.3396)" fill="#e6e6e6" /><rect x="515.96897" y="175.90069" width="13.47506" height="6.17607" transform="translate(-183.84194 189.97078) rotate(-26.3396)" fill="#ccc" /><rect x="527.92649" y="199.75285" width="13.47506" height="6.17607" transform="translate(-193.3166 197.7837) rotate(-26.3396)" fill="#ccc" /><rect x="219.56748" y="177.40264" width="13.47506" height="53.33878" fill="#e6e6e6" /><rect x="219.56748" y="185.82455" width="13.47506" height="6.17607" fill="#ccc" /><rect x="219.56748" y="212.77467" width="13.47506" height="6.17607" fill="#ccc" /><rect x="198.79343" y="177.40264" width="13.47506" height="53.33878" fill="#e6e6e6" /><rect x="198.79343" y="185.82455" width="13.47506" height="6.17607" fill="#ccc" /><rect x="198.79343" y="212.77467" width="13.47506" height="6.17607" fill="#ccc" /><rect x="402.53712" y="237.90336" width="13.47506" height="53.33878" transform="translate(-233.72439 148.5586) rotate(-26.3396)" fill="#e6e6e6" /><rect x="395.81101" y="247.89913" width="13.47506" height="6.17607" transform="translate(-228.39489 144.16384) rotate(-26.3396)" fill="#ccc" /><rect x="407.76853" y="272.05128" width="13.47506" height="6.17607" transform="translate(-237.86955 151.97676) rotate(-26.3396)" fill="#ccc" /><rect x="345.83517" y="177.40264" width="13.47506" height="53.33878" fill="#e6e6e6" /><rect x="345.83517" y="185.82455" width="13.47506" height="6.17607" fill="#ccc" /><rect x="345.83517" y="212.77467" width="13.47506" height="6.17607" fill="#ccc" /><rect x="325.06112" y="177.40264" width="13.47506" height="53.33878" fill="#e6e6e6" /><rect x="325.06112" y="185.82455" width="13.47506" height="6.17607" fill="#ccc" /><rect x="325.06112" y="212.77467" width="13.47506" height="6.17607" fill="#ccc" /><rect x="528.8048" y="237.90336" width="13.47506" height="53.33878" transform="translate(-220.61527 204.58241) rotate(-26.3396)" fill="#e6e6e6" /><rect x="522.0787" y="247.89913" width="13.47506" height="6.17607" transform="translate(-215.28577 200.18764) rotate(-26.3396)" fill="#ccc" /><rect x="534.03622" y="272.05128" width="13.47506" height="6.17607" transform="translate(-224.76043 208.00056) rotate(-26.3396)" fill="#ccc" /><rect x="449.98737" y="32.64567" width="53.55594" height="53.55594" fill="#e6e6e6" /><rect x="460.69856" y="43.35686" width="32.13357" height="32.13357" fill="#ccc" /><polygon points="470 54.143 476.814 65.944 483.627 77.745 470 77.745 456.373 77.745 463.187 65.944 470 54.143" fill="#e6e6e6" /><polygon points="481.839 56.398 488.653 68.199 495.466 80 481.839 80 468.212 80 475.026 68.199 481.839 56.398" fill="#e6e6e6" /><circle cx="486.63091" cy="48.99433" r="3.94623" fill="#e6e6e6" /><rect x="179.12282" y="32.64567" width="53.55594" height="53.55594" fill="#e6e6e6" /><rect x="189.83401" y="43.35686" width="32.13357" height="32.13357" fill="#ccc" /><polygon points="199.136 54.143 205.949 65.944 212.763 77.745 199.136 77.745 185.509 77.745 192.322 65.944 199.136 54.143" fill="#e6e6e6" /><polygon points="210.975 56.398 217.788 68.199 224.601 80 210.975 80 197.348 80 204.161 68.199 210.975 56.398" fill="#e6e6e6" /><circle cx="215.76636" cy="48.99433" r="3.94623" fill="#e6e6e6" /><path d="M230.32422,458.34544l3.46953-5.362a80.3871,80.3871,0,0,0-3.55953-8.33251l-2.24351,1.812,1.77642-2.74534c-1.69294-3.3325-3.02505-5.43215-3.02505-5.43215s-6.95827,10.96511-9.283,22.57466l4.45222,6.88072-4.92881-3.981a32.52438,32.52438,0,0,0-.27041,4.0782c0,13.74959,4.49057,24.89583,10.03,24.89583s10.03-11.14624,10.03-24.89583a42.818,42.818,0,0,0-2.29454-12.84723Z" transform="translate(-158.82681 -60.50072)" fill="#6c63ff" /><path d="M254.8821,470.26556l6.24485-1.33818a80.386,80.386,0,0,0,3.375-8.40894l-2.86772-.30508,3.19737-.68514c1.15934-3.55352,1.70208-5.98014,1.70208-5.98014s-12.67374,2.83326-22.52676,9.39864l-1.71721,8.01359-.67022-6.30016a32.52414,32.52414,0,0,0-3.07493,2.69252c-9.72243,9.72242-14.4287,20.77932-10.51175,24.69627s14.97385-.78932,24.69628-10.51174a42.818,42.818,0,0,0,7.46188-10.70686Z" transform="translate(-158.82681 -60.50072)" fill="#6c63ff" /><path d="M257.16309,523.46949c-14.48118.92631-30.25994-.05387-47.04589,0V485.03764c14.79122,2.30262,30.56472,2.06615,47.04589,0Z" transform="translate(-158.82681 -60.50072)" fill="#3f3d56" /><rect x="500.99759" y="475.03125" width="195.51126" height="253.55366" fill="#e6e6e6" /><rect x="92.66419" y="488.269" width="10.18288" height="240.31592" fill="#e6e6e6" /><rect y="457.72036" width="696.50885" height="20.36576" fill="#e6e6e6" /><rect x="87.57275" y="478.08612" width="20.36576" height="20.36576" fill="#e6e6e6" /><polygon points="614.155 489.796 613.009 494.379 584.497 494.379 582.779 489.796 510.162 489.796 510.162 536.638 687.344 536.638 687.344 489.796 614.155 489.796" fill="#3f3d56" /><polygon points="614.155 548.857 613.009 553.439 584.497 553.439 582.779 548.857 510.162 548.857 510.162 595.698 687.344 595.698 687.344 548.857 614.155 548.857" fill="#3f3d56" /><polygon points="614.155 607.918 613.009 612.5 584.497 612.5 582.779 607.918 510.162 607.918 510.162 654.759 687.344 654.759 687.344 607.918 614.155 607.918" fill="#3f3d56" /><polygon points="614.155 666.979 613.009 671.561 584.497 671.561 582.779 666.979 510.162 666.979 510.162 713.82 687.344 713.82 687.344 666.979 614.155 666.979" fill="#3f3d56" /><polygon points="377.785 454.665 317.706 454.665 319.742 428.19 375.748 428.19 377.785 454.665" fill="#e6e6e6" /><rect x="314.65093" y="451.61063" width="67.20699" height="6.10973" fill="#e6e6e6" /><path d="M621.63862,318.12753H392.01472a6.10973,6.10973,0,0,0-6.10973,6.10973V464.25183H627.74834V324.23726A6.10973,6.10973,0,0,0,621.63862,318.12753Z" transform="translate(-158.82681 -60.50072)" fill="#3f3d56" /><path d="M385.905,464.25183V487.1633a6.10973,6.10973,0,0,0,6.10973,6.10973h229.6239a6.10973,6.10973,0,0,0,6.10972-6.10973V464.25183Z" transform="translate(-158.82681 -60.50072)" fill="#e6e6e6" /><rect x="239.29763" y="270.35541" width="217.91359" height="122.19453" fill="#fff" /><circle cx="348.25442" cy="418.00714" r="6.10973" fill="#3f3d56" /><path d="M1023.86229,787.5582c-22.25416,1.42352-46.50239-.08278-72.29843,0V728.49751c22.73061,3.53859,46.97076,3.17519,72.29843,0Z" transform="translate(-158.82681 -60.50072)" fill="#3f3d56" /><polygon points="831.432 673.3 825.322 673.3 827.359 553.949 829.395 553.949 831.432 673.3" fill="#3f3d56" /><polygon points="858.926 674.107 852.816 674.107 854.853 554.755 856.889 554.755 858.926 674.107" fill="#3f3d56" /><polygon points="806.993 674.107 800.883 674.107 802.92 554.755 804.956 554.755 806.993 674.107" fill="#3f3d56" /><path d="M995.35023,538.07769l9.8628-15.24249a228.51376,228.51376,0,0,0-10.11861-23.68669l-6.3776,5.1511,5.0498-7.80416c-4.81251-9.47323-8.59926-15.44187-8.59926-15.44187s-19.78017,31.17033-26.3886,64.17264L971.435,564.78593l-14.011-11.31664a92.45186,92.45186,0,0,0-.76869,11.593c0,39.08574,12.76527,70.771,28.51206,70.771s28.512-31.68526,28.512-70.771c0-12.117-2.74124-24.794-6.52266-36.52063Z" transform="translate(-158.82681 -60.50072)" fill="#e6e6e6" /><path d="M1022.844,540.11427l9.8628-15.2425a228.5147,228.5147,0,0,0-10.11861-23.68669l-6.3776,5.15111,5.0498-7.80416c-4.81251-9.47323-8.59926-15.44188-8.59926-15.44188s-19.78017,31.17034-26.3886,64.17264l12.65626,19.55972-14.011-11.31664a92.45186,92.45186,0,0,0-.76869,11.593c0,39.08574,12.76527,70.771,28.51206,70.771s28.51206-31.68526,28.51206-70.771c0-12.117-2.74125-24.794-6.52267-36.52064Z" transform="translate(-158.82681 -60.50072)" fill="#6c63ff" /><path d="M970.91133,540.11427l9.8628-15.2425a228.51678,228.51678,0,0,0-10.11862-23.68669l-6.3776,5.15111,5.0498-7.80416c-4.8125-9.47323-8.59926-15.44188-8.59926-15.44188s-19.78017,31.17034-26.3886,64.17264l12.65626,19.55972-14.011-11.31664a92.45186,92.45186,0,0,0-.76869,11.593c0,39.08574,12.76527,70.771,28.51206,70.771s28.51206-31.68526,28.51206-70.771c0-12.117-2.74125-24.794-6.52266-36.52064Z" transform="translate(-158.82681 -60.50072)" fill="#6c63ff" /><rect x="309.96395" y="304.84783" width="58.75616" height="3.37283" fill="#3f3d56" /><rect x="309.96395" y="317.15098" width="90.7323" height="3.37283" fill="#6c63ff" /><rect x="309.96395" y="328.74233" width="73.94482" height="3.37283" fill="#6c63ff" /><rect x="309.96395" y="340.28988" width="43.16779" height="3.37283" fill="#3f3d56" /><rect x="309.96395" y="351.83743" width="65.15139" height="3.37283" fill="#3f3d56" /><rect x="283.18393" y="303.64873" width="7.19463" height="7.19463" fill="#3f3d56" /><rect x="283.18393" y="315.24008" width="7.19463" height="7.19463" fill="#6c63ff" /><rect x="283.18393" y="326.83143" width="7.19463" height="7.19463" fill="#6c63ff" /><rect x="283.18393" y="338.42278" width="7.19463" height="7.19463" fill="#3f3d56" /><rect x="283.18393" y="350.01413" width="7.19463" height="7.19463" fill="#3f3d56" /><path d="M605.94216,358.96335H575.109a107.84044,107.84044,0,0,1,0-36.76267h30.8332A66.14839,66.14839,0,0,0,605.94216,358.96335Z" transform="translate(-158.82681 -60.50072)" fill="#6c63ff" /><path d="M381.59071,432.64519l-12.68484-3.092a32.65651,32.65651,0,0,1-32.05067-39.12409v0a42.68467,42.68467,0,0,1,42.631-42.73825h.00008a42.68468,42.68468,0,0,1,42.73825,42.631v.00006C429.41674,415.35014,406.89108,438.81238,381.59071,432.64519Z" transform="translate(-158.82681 -60.50072)" fill="#2f2e41" /><circle cx="236.61974" cy="345.24334" r="31.36369" fill="#ffb8b8" /><path d="M374.992,422.10773s-9.54547,32.72733-15,35.4546,43.63644,6.8182,43.63644,6.8182-1.36364-31.36369,1.36364-34.091S374.992,422.10773,374.992,422.10773Z" transform="translate(-158.82681 -60.50072)" fill="#ffb8b8" /><path d="M424.083,623.92626s61.36374-5.45456,69.54557,15S488.174,780.74471,488.174,780.74471H462.26485V681.19908s-110.4725-31.40179-110.4725-42.31089S424.083,623.92626,424.083,623.92626Z" transform="translate(-158.82681 -60.50072)" fill="#2f2e41" /><path d="M484.08307,775.29015l13.63639,5.45456s16.36366-1.36364,9.54547,10.90911A27.00366,27.00366,0,0,1,488.174,805.29021s-25.90914,9.54547-27.27278,0,6.8182-28.63642,6.8182-28.63642Z" transform="translate(-158.82681 -60.50072)" fill="#2f2e41" /><path d="M389.992,623.92626s61.36374-5.45456,69.54557,15S454.083,780.74471,454.083,780.74471H428.17388V681.19908s-78.4181-18.164-78.4181-29.07315c0-5.12492-5.34348-31.171,4.07315-36.65836C364.45693,609.27432,389.992,623.92626,389.992,623.92626Z" transform="translate(-158.82681 -60.50072)" fill="#2f2e41" /><path d="M449.9921,775.29015l13.63639,5.45456s16.36367-1.36364,9.54547,10.90911A27.00366,27.00366,0,0,1,454.083,805.29021s-25.90914,9.54547-27.27277,0,6.81819-28.63642,6.81819-28.63642Z" transform="translate(-158.82681 -60.50072)" fill="#2f2e41" /><path d="M361.35559,453.47142l40.98018,4.45436a30.18224,30.18224,0,0,1,26.26893,23.76669L444.53755,557.108s5.45455,75.00013-5.45456,79.091-25.90913-16.36366-46.36371-13.63638-47.04554,8.86365-47.04554,8.86365S341.451,497.179,340.901,486.19875C339.80142,464.24769,361.35559,453.47142,361.35559,453.47142Z" transform="translate(-158.82681 -60.50072)" fill="#575a89" /><path d="M458.42733,627.82255l16.82365,9.9078s30.18279-4.33064,29.24058,6.278-33.8887,8.55886-33.8887,8.55886l-20.275-12.493Z" transform="translate(-158.82681 -60.50072)" fill="#ffb8b8" /><circle cx="175.7429" cy="299.47504" r="20.25966" fill="#2f2e41" /><path d="M353.26293,349.08471a20.2502,20.2502,0,0,0-24.24652-19.836,20.25023,20.25023,0,1,1,12.63025,38.16451A20.243,20.243,0,0,0,353.26293,349.08471Z" transform="translate(-158.82681 -60.50072)" fill="#2f2e41" /><path d="M370.64347,360.57471l27.313-5.02907,21.00491,13.16494a31.86273,31.86273,0,0,1,14.6776,31.09515l-21.0372-5.33225-4.71074-11.81208-5.61047,9.196-29.33406,37.75029-16.46978-10.48815-14.68292-23.00931Z" transform="translate(-158.82681 -60.50072)" fill="#2f2e41" /><path d="M393.13569,465.07123l13.63639-6.8182s28.63641,4.09092,34.091,23.18186,30,151.3639,30,151.3639L447.68124,643.7079l-32.72733-80.45468Z" transform="translate(-158.82681 -60.50072)" fill="#575a89" /><polygon points="245.917 458.23 259.565 511.205 283.767 570.701 282.928 572.761 254.063 512.199 245.917 458.23" opacity="0.2" /><polygon points="144.084 750.379 139.271 748.721 185.896 610.231 192.636 612.553 144.084 750.379" fill="#3f3d56" /><polygon points="322.291 750.379 327.105 748.721 280.479 610.231 273.74 612.553 322.291 750.379" fill="#3f3d56" /><polygon points="223.77 778.981 228.861 778.999 230.443 617.107 223.315 617.082 223.77 778.981" fill="#3f3d56" /><path d="M291.12655,589.35709l13.96582,56.44513a44.82625,44.82625,0,0,0,32.64214,32.72145l.00008,0a238.26046,238.26046,0,0,0,118.54694-.7638l20.8512-5.49922c12.11558-3.19531,21.22652-13.60111,22.0886-26.10127a25.68469,25.68469,0,0,0-2.323-12.8718q-.12219-.25966-.24559-.51476a34.06444,34.06444,0,0,0-29.59817-19.13845l-22.08892-.71254L364.521,577.28177s-27.66705-14.0531-50.4117-15.62629C299.08852,560.61654,287.51024,574.74121,291.12655,589.35709Z" transform="translate(-158.82681 -60.50072)" fill="#6c63ff" /><rect x="543.25654" y="351.30929" width="79.42645" height="107.93851" fill="#e6e6e6" /><rect x="552.42113" y="363.76373" width="61.09727" height="83.02962" fill="#fff" /><rect x="576.46734" y="385.49176" width="29.60198" height="3.37283" fill="#3f3d56" /><rect x="559.8702" y="383.62466" width="7.19463" height="7.19463" fill="#3f3d56" /><rect x="576.46734" y="399.74779" width="29.60198" height="3.37283" fill="#3f3d56" /><rect x="559.8702" y="397.88069" width="7.19463" height="7.19463" fill="#3f3d56" /><rect x="576.46734" y="414.00382" width="29.60198" height="3.37283" fill="#3f3d56" /><rect x="559.8702" y="412.13672" width="7.19463" height="7.19463" fill="#3f3d56" /><rect x="579.9149" y="354.36415" width="6.10973" height="6.10973" rx="3.05486" fill="#3f3d56" /></svg>
            </div>
          </div>
        </div>
        <div className="relative -mt-12 lg:-mt-24 bg-gradient-to-r from-indigo-200 " >
          <svg viewBox="0 0 1428 174" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
            <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
              <g transform="translate(-2.000000, 44.000000)" fill="#FFFFFF" fillRule="nonzero">
                <path d="M0,0 C90.7283404,0.927527913 147.912752,27.187927 291.910178,59.9119003 C387.908462,81.7278826 543.605069,89.334785 759,82.7326078 C469.336065,156.254352 216.336065,153.6679 0,74.9732496" opacity="0.100000001"></path>
                <path
                  d="M100,104.708498 C277.413333,72.2345949 426.147877,52.5246657 546.203633,45.5787101 C666.259389,38.6327546 810.524845,41.7979068 979,55.0741668 C931.069965,56.122511 810.303266,74.8455141 616.699903,111.243176 C423.096539,147.640838 250.863238,145.462612 100,104.708498 Z"
                  opacity="0.100000001"
                ></path>
                <path d="M1046,51.6521276 C1130.83045,29.328812 1279.08318,17.607883 1439,40.1656806 L1439,120 C1271.17211,77.9435312 1140.17211,55.1609071 1046,51.6521276 Z" id="Path-4" opacity="0.200000003"></path>
              </g>
              <g transform="translate(-4.000000, 76.000000)" fill="#FFFFFF" fillRule="nonzero">
                <path
                  d="M0.457,34.035 C57.086,53.198 98.208,65.809 123.822,71.865 C181.454,85.495 234.295,90.29 272.033,93.459 C311.355,96.759 396.635,95.801 461.025,91.663 C486.76,90.01 518.727,86.372 556.926,80.752 C595.747,74.596 622.372,70.008 636.799,66.991 C663.913,61.324 712.501,49.503 727.605,46.128 C780.47,34.317 818.839,22.532 856.324,15.904 C922.689,4.169 955.676,2.522 1011.185,0.432 C1060.705,1.477 1097.39,3.129 1121.236,5.387 C1161.703,9.219 1208.621,17.821 1235.4,22.304 C1285.855,30.748 1354.351,47.432 1440.886,72.354 L1441.191,104.352 L1.121,104.031 L0.457,34.035 Z"
                ></path>
              </g>
            </g>
          </svg>
        </div>
        <section className="bg-white border-b py-8">
          <div className="container max-w-5xl mx-auto m-8">
            <h1 className="w-full my-2 text-5xl font-bold leading-tight text-center text-gray-800">
              Daily Productivity Assistance
            </h1>
            <div className="w-full mb-4">
              <div className="h-1 mx-auto gradient w-64 opacity-25 my-0 py-0 rounded-t"></div>
            </div>
            <div className="flex flex-wrap">
              <div className="w-5/6 sm:w-1/2 p-6">
                <h3 className="text-3xl text-gray-900 font-bold leading-none mb-3">
                  Plan your daily tasks without chaos
                </h3>
                <p className="text-gray-900 mb-8 text-left">
                  Create tasks and  track their progress.
                  <br />
                  <br />
                  A new way to execute your projects.


                </p>
              </div>
              <div className="w-full sm:w-1/2 p-6">
                <img className="w-4/6 sm:h-64 mx-auto" alt="" src={productivity}>

                </img>
              </div>
            </div>
            <div className="flex flex-wrap flex-col-reverse sm:flex-row">
              <div className="w-full sm:w-1/2 p-6 mt-6">
                <img className="w-5/6 sm:h-64 mx-auto" alt="" src={todo}>

                </img>
              </div>
              <div className="w-full sm:w-1/2 p-6 mt-6">
                <div className="align-middle">
                  <h3 className="text-3xl text-gray-900 font-bold leading-none mb-3">
                    No more budget overuns
                  </h3>
                  <p className="text-gray-900 mb-8 text-left">
                    Budget for your tasks and track the cost of your projects.
                    <br />
                    <br />
                    Our intuitive dashboard provides the visibility of your expenditure.

                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="bg-white border-b py-8">
          <div className="container mx-auto flex flex-wrap pt-4 pb-12">
            <h1 className="w-full my-2 text-5xl font-bold leading-tight text-center text-gray-800">
              Features
            </h1>
            <div className="flex flex-row justify-between flex-wrap">
              <div className="w-full mb-4">
                <div className="h-1 mx-auto gradient w-64 opacity-25 my-0 py-0 rounded-t"></div>
              </div>
              <div className="w-full md:w-1/3 p-6 flex flex-col flex-grow flex-shrink">
                <div className="flex-1 bg-white rounded-t rounded-b-none overflow-hidden shadow">
                  <a href="/" className="flex flex-wrap no-underline hover:no-underline">
                    <p className="w-full text-gray-900 text-xs md:text-sm px-6">
                      KANBAN BOARD
                    </p>
                    <div className="w-full font-bold text-xl text-gray-900 px-6">
                      Track the progress of your tasks.
                    </div>
                    <p className="text-gray-900 text-base px-6 mb-5 text-left">
                      Our KanBan board enables you to create tasks using beautiful cards.
                      <br />
                      <br />
                      You can track the progress of your tasks using a drag and drop functionality.
                      <br />
                      <br />
                      The Kanban board helps you remember your tasks and complete them on time.
                    </p>
                  </a>
                </div>
                <div className="flex-none mt-auto bg-white rounded-b rounded-t-none overflow-hidden shadow p-6">
                  <div className="flex items-center justify-start">
                    <button
                      className="bg-gradient-to-r from-indigo-500  mx-auto lg:mx-0 hover:underline gradient text-black font-bold rounded-full my-6 py-4 px-8 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">
                      Learn More
                    </button>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-1/3 p-6 flex flex-col flex-grow flex-shrink">
                <div className="flex-1 bg-white rounded-t rounded-b-none overflow-hidden shadow">
                  <a href="/" className="flex flex-wrap no-underline hover:no-underline">
                    <p className="w-full text-gray-900 text-xs md:text-sm px-6 uppercase">
                     Bug Tracker
                    </p>
                    <div className="w-full font-bold text-xl text-gray-900 px-6">
                      Let your engineering team track anf fix bugs with ease
                    </div>
                    <p className="text-gray-900 text-base px-6 mb-5 text-left">
                    Your engineering team can create tickets for tracking bugs in your application
                      <br />
                      <br />
                      The team leader can assign an engineer to take care of the bug
                      <br />
                      <br />
                      Once completed, an engineer can mark the process of debugging as completed
                    </p>
                  </a>
                </div>
                <div className="flex-none mt-auto bg-white rounded-b rounded-t-none overflow-hidden shadow p-6">
                  <div className="flex items-center justify-center">
                    <button
                      className="bg-gradient-to-r from-indigo-500  mx-auto lg:mx-0 hover:underline gradient text-black font-bold rounded-full my-6 py-4 px-8 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">
                      Learn More
                    </button>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-1/3 p-6 flex flex-col flex-grow flex-shrink">
                <div className="flex-1 bg-white rounded-t rounded-b-none overflow-hidden shadow">
                  <a href="/" className="flex flex-wrap no-underline hover:no-underline">
                    <p className="w-full text-gray-900 text-xs md:text-sm px-6 uppercase">
                      Expense tracker
                    </p>
                    <div className="w-full font-bold text-xl text-gray-900 px-6">
                      Track the cost of your tasks and projects
                    </div>
                    <p className="text-gray-900 text-base px-6 mb-5 text-left">
                      Say goodbye to budget overruns
                      <br />
                      <br />
                      Record expenditure and keep track of costs
                      <br />
                      <br />
                      Have a clear visibility of your costs from our dashboard
                    </p>
                  </a>
                </div>
                <div className="flex-none mt-auto bg-white rounded-b rounded-t-none overflow-hidden shadow p-6">
                  <div className="flex items-center justify-end">
                    <button
                      className="bg-gradient-to-r from-indigo-500  mx-auto lg:mx-0 hover:underline gradient text-black font-bold rounded-full my-6 py-4 px-8 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">
                      Learn More
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        
        <svg className="wave-top bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" viewBox="0 0 1439 147" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
          <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
            <g transform="translate(-1.000000, -14.000000)" fillRule="nonzero">
              <g className="wave" fill="#f8fafc">
                <path
                  d="M1440,84 C1383.555,64.3 1342.555,51.3 1317,45 C1259.5,30.824 1206.707,25.526 1169,22 C1129.711,18.326 1044.426,18.475 980,22 C954.25,23.409 922.25,26.742 884,32 C845.122,37.787 818.455,42.121 804,45 C776.833,50.41 728.136,61.77 713,65 C660.023,76.309 621.544,87.729 584,94 C517.525,105.104 484.525,106.438 429,108 C379.49,106.484 342.823,104.484 319,102 C278.571,97.783 231.737,88.736 205,84 C154.629,75.076 86.296,57.743 0,32 L0,0 L1440,0 L1440,84 Z"
                ></path>
              </g>
              <g transform="translate(1.000000, 15.000000)" fill="#FFFFFF">
                <g transform="translate(719.500000, 68.500000) rotate(-180.000000) translate(-719.500000, -68.500000) ">
                  <path d="M0,0 C90.7283404,0.927527913 147.912752,27.187927 291.910178,59.9119003 C387.908462,81.7278826 543.605069,89.334785 759,82.7326078 C469.336065,156.254352 216.336065,153.6679 0,74.9732496" opacity="0.100000001"></path>
                  <path
                    d="M100,104.708498 C277.413333,72.2345949 426.147877,52.5246657 546.203633,45.5787101 C666.259389,38.6327546 810.524845,41.7979068 979,55.0741668 C931.069965,56.122511 810.303266,74.8455141 616.699903,111.243176 C423.096539,147.640838 250.863238,145.462612 100,104.708498 Z"
                    opacity="0.100000001"
                  ></path>
                  <path d="M1046,51.6521276 C1130.83045,29.328812 1279.08318,17.607883 1439,40.1656806 L1439,120 C1271.17211,77.9435312 1140.17211,55.1609071 1046,51.6521276 Z" opacity="0.200000003"></path>
                </g>
              </g>
            </g>
          </g>
        </svg>
        <section className="w-full mx-auto text-center py-6 mb-12 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 mt-0">
          <h1 className="w-full my-2 text-5xl font-bold leading-tight text-center text-white">
            Sign Up for Free
          </h1>
          <div className="w-full mb-4">
            <div className="h-1 mx-auto bg-white w-1/6 opacity-25 my-0 py-0 rounded-t"></div>
          </div>
          <h3 className="my-4 text-3xl leading-tight">
            Increase your productivity by 10x
          </h3>
    {    !userLogin &&   <button onClick={() => { setShowModal(true); window.scrollTo(0, 0) }}
            className="mx-auto  hover:underline bg-white text-gray-900 font-bold rounded-full mt-6 mb-16 py-4 px-8 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">
            Sign Up
          </button>}
        </section>

        <footer className="bg-white">
          <div className="container mx-auto px-8">
            <div className="w-full flex flex-col md:flex-row py-6">
              <div className="flex-1 mb-6 text-black">

              </div>
              <div className="flex-1">
                <p className="uppercase text-gray-900 md:mb-6">Links</p>
                <ul className="list-reset mb-6">
                  <li className="mt-2 inline-block mr-2 md:block md:mr-0">
                    <a href="/" className="no-underline hover:underline text-gray-900 hover:text-pink-500">FAQ</a>
                  </li>
                  <li className="mt-2 inline-block mr-2 md:block md:mr-0">
                    <a href="/" className="no-underline hover:underline text-gray-900 hover:text-pink-500">Help</a>
                  </li>
                  <li className="mt-2 inline-block mr-2 md:block md:mr-0">
                    <a href="/" className="no-underline hover:underline text-gray-900 hover:text-pink-500">Support</a>
                  </li>
                </ul>
              </div>
              <div className="flex-1">
                <p className="uppercase text-gray-900 md:mb-6">Legal</p>
                <ul className="list-reset mb-6">
                  <li className="mt-2 inline-block mr-2 md:block md:mr-0">
                    <a href="/" className="no-underline hover:underline text-gray-900 hover:text-pink-500">Terms</a>
                  </li>
                  <li className="mt-2 inline-block mr-2 md:block md:mr-0">
                    <a href="/" className="no-underline hover:underline text-gray-900 hover:text-pink-500">Privacy</a>
                  </li>
                </ul>
              </div>
              <div className="flex-1">
                <p className="uppercase text-gray-900 md:mb-6">Social</p>
                <ul className="list-reset mb-6">
                  <li className="mt-2 inline-block mr-2 md:block md:mr-0">
                    <a href="/" className="no-underline hover:underline text-gray-900 hover:text-pink-500">Facebook</a>
                  </li>
                  <li className="mt-2 inline-block mr-2 md:block md:mr-0">
                    <a href="/" className="no-underline hover:underline text-gray-900 hover:text-pink-500">Linkedin</a>
                  </li>
                  <li className="mt-2 inline-block mr-2 md:block md:mr-0">
                    <a href="/" className="no-underline hover:underline text-gray-900 hover:text-pink-500">Twitter</a>
                  </li>
                </ul>
              </div>
              <div className="flex-1">
                <p className="uppercase text-gray-900 md:mb-6">Company</p>
                <ul className="list-reset mb-6">
                  <li className="mt-2 inline-block mr-2 md:block md:mr-0">
                    <a href="/" className="no-underline hover:underline text-gray-900 hover:text-pink-500">Official Blog</a>
                  </li>
                  <li className="mt-2 inline-block mr-2 md:block md:mr-0">
                    <a href="/" className="no-underline hover:underline text-gray-900 hover:text-pink-500">About Us</a>
                  </li>
                  <li className="mt-2 inline-block mr-2 md:block md:mr-0">
                    <a href="/" className="no-underline hover:underline text-gray-900 hover:text-pink-500">Contact</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

        </footer>

        {showModal && <Authmodal />}
      </div>

    </div>
  )
}

export default Home