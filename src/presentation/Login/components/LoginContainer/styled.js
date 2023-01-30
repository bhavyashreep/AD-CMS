import Styled from "styled-components";

const Container = Styled.div`
.side-bg{
    object-fit:cover;
}
.ant-col-offset-8 {
    margin-left:0 !important;
}
.ant-checkbox + span{
    width:110px;
}
box-sizing:border-box;

    width : 100%;
    height: 100vh;
    display: flex;
    .ImageContainer{
        height:100%;
        // background: linear-gradient(0deg, #3777BC, #3777BC), linear-gradient(45deg, #5F63F2 0%, #FF69A5 100%);
        // opacity:0.1;
        width: 55%;
        display : flex;
        flex-direction : column;
        align-items : flex-start;
        justify-content : center;
        border-radius:0 78px 78px 0;
        h1{
            font-weight: 800;
            margin-bottom:30px;
        }
        div{
            width: 70%;
            text-align : center;
            img{
                width : 100%;
                height : 100%
            }
        }
        img{
            height:100%;
            width:100%;
        }
    }
    .FormContainer{
        width:45%;
        display : flex;
        flex-direction : column;
        align-items : center;
        justify-content : center;
    }
`;

export default Container;
