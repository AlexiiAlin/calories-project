// import React, {useContext, useEffect, useRef, useState} from 'react';
// import {useDispatch, useSelector} from "react-redux";
// import {MedicalInfoActions} from "../../../../store/medical-infos/medical-info-actions";
// import {UserContext} from "../../../../contexts/user-context";
// import {AppState} from "../../../../store/app-state";
// import Highcharts from 'highcharts';
// import HighchartsReact from 'highcharts-react-official';
// import {
//   blacklistedMedicalInfoProperties,
//   mapMedicalInfosToSeries,
//   mapMedicalInfosToXAxisCategories
// } from "../../../../helpers/mappers";
// import moment from "moment";
// import {highchartsOptions} from "./medical-history.config";
// import {capitalizeFirstLetter} from "../../../../helpers/utils";
// import {GeneralRow} from "../../../shared/general-row/GeneralRow";
// import {Typography} from "@material-ui/core";
// import {KeyboardArrowDown, KeyboardArrowUp} from "@material-ui/icons";
//
// function MedicalHistory(props) {
//   const [userState] = useContext(UserContext);
//   const dispatch = useDispatch();
//
//   useEffect(() => {
//     if (userState && userState.user && userState.user.id) {
//       dispatch(MedicalInfoActions.loadMedicalInfos(userState.user.id));
//     }
//   }, [dispatch, userState]);
//
//   const {data} = useSelector((state: AppState) => state.medicalInfos);
//   const chartComponentRef = useRef<HighchartsReact.RefObject>(null);
//   const [options, setOptions] = useState(highchartsOptions);
//   const [isOpened, setIsOpened] = useState(false);
//
//   useEffect(() => {
//     if (data.length > 0) {
//       const series = mapMedicalInfosToSeries(data);
//       const categories = mapMedicalInfosToXAxisCategories(data);
//       const firstDate = moment(data[0].date).format('DD MMM YYYY');
//       const lastDate = moment(data[data.length - 1].date).format('DD MMM YYYY');
//       const patientName = userState && userState.user && userState.user.name && `Patient name: ${userState.user.name}`;
//
//       setOptions({
//         ...highchartsOptions,
//         series,
//         title: {
//           text: `Medical history: ${firstDate} ${data.length > 1 && ` -> ${lastDate}`}`
//         },
//         subtitle: {
//           text: patientName
//         },
//         xAxis: {
//           categories,
//         },
//       });
//     }
//   }, [data, userState]);
//
//   const renderedMedicalInfos = data && isOpened && data.map(medicalInfo => {
//     return (
//       <div className="flex-row items-center" key={medicalInfo.id}>
//         <div className="flex flex-column">
//           <div className="p-4 margin-negative cursor-pointer">
//             <Typography variant="h3">
//               {moment(medicalInfo.date).format('DD MMM YYYY')}
//             </Typography>
//           </div>
//           {
//             Object.keys(medicalInfo)
//               .filter(medicalInfoKey => {
//                 return blacklistedMedicalInfoProperties.indexOf(medicalInfoKey) === -1 && medicalInfo[medicalInfoKey]
//               })
//               .map(medicalInfoKey => {
//                 return (
//                   <GeneralRow
//                     key={medicalInfoKey}
//                     label={capitalizeFirstLetter(medicalInfoKey)}
//                     value={medicalInfo[medicalInfoKey]}
//                   />
//                 )
//               })
//           }
//           <hr className="general-row my-4"/>
//         </div>
//       </div>
//     )
//   })
//
//   return (
//     <div className="general-wrapper mt-8">
//       <div className="w-full">
//         {
//           data && (
//             <HighchartsReact
//               highcharts={Highcharts}
//               options={options}
//               ref={chartComponentRef}
//               {...props}
//             />
//           )
//         }
//
//         <div
//           className="flex items-center p-4 margin-negative mt-4 cursor-pointer"
//           onClick={() => setIsOpened(!isOpened)}
//         >
//           <Typography variant="h2">
//             {isOpened ? 'Close' : 'Open'} breakdown
//           </Typography>
//           <div className="ml-2">
//             {isOpened ? <KeyboardArrowUp style={{width: 24, height: 24}}/> : <KeyboardArrowDown style={{width: 24, height: 24}}/>}
//           </div>
//         </div>
//         {
//           renderedMedicalInfos
//         }
//       </div>
//     </div>
//   );
// }
//
// export default MedicalHistory;

export default {};
