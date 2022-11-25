import React from 'react';
import $ from 'jquery';
import '../css/search.css'

class Search extends React.Component {
    // componentDidMount() {
    //     this.callApi()
    //       .then((res) => res.json()).then((res) => {console.log(res)})
    //       .catch((err) => console.log(err));
    //   }
    
    //   callApi = async () => {
    //     await fetch('/api/room/filter', {
    //         mathod: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify({
    //             user: {
    //                 name: "HON",
    //                 email: "dda"
    //             }
    //         })
    //     });
    //   };
    render() {
        console.log(this.arr)
        const show = (e) => {
            const reqoption = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    user: {
                        window: 1,
                        size: 5,
                    }
                })
            }
            console.log('클릭');
            $('.search').css("width","auto")
            fetch("/api/room/filter", reqoption)
            // .then((res) => res.json()) // Result를 JSON으로 받습니다.
            // .then((res) => {
            //     console.log(res); // 결과를 console창에 표시합니다.
            // });   
        }
        
        return(
            <div className="search" onClick={show}>
                <div className="menu-box">
                    <button></button>
                    <button></button>
                    <button></button>
                </div>
            </div>
        )
    }
}

export {Search as default};