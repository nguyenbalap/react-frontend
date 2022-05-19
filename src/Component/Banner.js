import React from 'react';
export default function Banner() {
    return (
        <>
            <div class="banner">
                <div class="container">
                    <div class="row">
                        <div class="col-md-4" >
                            <div class="banner_item align-items-center" style={{ backgroundImage: `url("https://media.gucci.com/content/DarkGray_CategorySingle_Medium_390x390/1650551426/CategorySingle_678843UULAG9682_001_Light.jpg")` }}>
                                <div class="banner_category">
                                    <a href="categories.html">women's</a>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4" >
                            <div class="banner_item align-items-center" style={{ backgroundImage: `url("https://media.gucci.com/content/DarkGray_CategoryOneThird_Standard_400x400/1650551414/CategoryOneThird_705388I33308012_001_Light.jpg")` }}>
                                <div class="banner_category">
                                    <a href="categories.html">accessories's</a>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4" >
                            <div class="banner_item align-items-center" style={{ backgroundImage: `url("https://media.gucci.com/content/LightGray_CategoryOneThird_Standard_400x400/1650551409/CategoryOneThird_673804I16001108_001_Light.jpg)` }}>
                                <div class="banner_category">
                                    <a href="categories.html">men's</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}