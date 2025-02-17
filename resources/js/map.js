const createMap = () => {
  const container = document.getElementById("map"); //지도를 담을 영역의 DOM 레퍼런스
  const options = {
    //지도를 생성할 때 필요한 기본 옵션
    center: new kakao.maps.LatLng(37.497487, 126.853612), //지도의 중심좌표.
    level: 2, //지도의 레벨(확대, 축소 정도)
    draggable: false,
    scrollwhell: false,
  };

  const map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴

  fetch(
    "https://tapi.skylark92.workers.dev/v2xCrossroadMapInformation/1.0"
  )
    .then((data) => data.json())
    .then((list) => {
      if (list?.length > 0) {
        list.forEach((item) => {
          if (item.mapCtptIntLat !== null && item.mapCtptIntLot !== null) {
            // 마커가 표시될 위치입니다
            const markerPosition = new kakao.maps.LatLng(
              item.mapCtptIntLat,
              item.mapCtptIntLot
            );

            // 마커를 생성합니다
            const marker = new kakao.maps.Marker({
              position: markerPosition,
            });

            // 마커가 지도 위에 표시되도록 설정합니다
            marker.setMap(map);

            // 마커를 클릭했을 때 마커 위에 표시할 인포윈도우를 생성합니다
            const iwContent =
              '<div style="padding:5px;">' + item.itstId + "</div>", // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
              iwRemoveable = true; // removeable 속성을 ture 로 설정하면 인포윈도우를 닫을 수 있는 x버튼이 표시됩니다

            // 인포윈도우를 생성합니다
            const infowindow = new kakao.maps.InfoWindow({
              content: iwContent,
              removable: iwRemoveable,
            });

            // 마커에 클릭이벤트를 등록합니다
            kakao.maps.event.addListener(marker, "click", function () {
              // 마커 위에 인포윈도우를 표시합니다
              infowindow.open(map, marker);
            });
          }
        });
      }
    });
}

export { createMap };