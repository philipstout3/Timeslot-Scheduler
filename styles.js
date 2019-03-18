import styled from 'styled-components';

export const TsTbl = styled.table `
  font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
  tr:not(:last-child):hover td:not(:nth-child(4)){
    background: #ddd;
}
`

export const TsTr = styled.tr `
  :hover {
    //background-color: #ddd;
    cursor: pointer;
  }
`

export const TsTh = styled.th `
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: black;
  color: white;
`

export const TsTd = styled.td `
  border: 1px solid #ddd;
  padding: 8px;
`

export const AddRow = styled.td `
  padding: 8px;
  text-align: right;
`

export const AddRowCenter = styled.td `
  padding: 8px;
`

export const AddRowText = styled.div `
  display: inline-block
  :hover {
    color: blue;
    cursor: pointer;
  }
`

export const EditRow = styled.input `
  font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;
  height: 30px
  font-size: 16px
`

export const SaveRow = styled.button `
  //background-color: #4CAF50;
  // float: right;
  font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;
  height: 30px
  font-size: 16px
  margin-left: 8px
  :hover {
    cursor: pointer;
  }
`

export const CancelSaveRow = styled.button `
  // float: right;
  margin-left: 8px
  font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;
  height: 30px
  font-size: 16px
  :hover {
    cursor: pointer;
  }
`

export const CreateProperty = styled.div `
  font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;
  display: flex;
  flex-direction: column;
`

export const DeleteRow = styled.button `
  background-color: red;
  font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;
  height: 30px
  font-size: 16px
  margin-left: 8px
  :hover {
    cursor: pointer;
`

export const EditTimeslots = styled.button `
  font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;
  height: 30px
  font-size: 16px
  margin-left: 8px
  :hover {
    cursor: pointer;
`