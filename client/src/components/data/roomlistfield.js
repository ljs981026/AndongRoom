const RoomlistColumn = [
  { field: "id", headerName: "번호", width: 90 },
  {
    field: "title",
    headerName: "원룸",
    width: 150,
    editable: true,
  },
  {
    field: "addr",
    headerName: "주소",
    width: 300,
    editable: true,
  },
  {
    field: "phone",
    headerName: "전화번호",
    width: 200,
    // editable: true,
  },
  {
    field: "deposit",
    headerName: "보증금",
    type: "number",
    width: 110,
    editable: true,
  },
  {
    field: "payment",
    headerName: "계약금",
    type: "number",
    width: 110,
    editable: true,
  },
];

export default RoomlistColumn;
