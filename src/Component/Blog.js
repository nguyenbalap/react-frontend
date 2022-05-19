import { useEffect, useState } from "react"
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';

export default function Blog() {

    const navigate = useNavigate();


    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('api/blogs').then(res => {
            setBlogs(res.data.blogs);
            setLoading(false);
        })
    }, [])
    return (
        <>
            <div class="blogs">
                <div class="container">
                    <div class="row">
                        <div class="col text-center">
                            <div class="section_title">
                                <h2>Latest Blogs</h2>
                            </div>
                        </div>
                    </div>
                    <div class="row blogs_container">

                        {loading ? "" :

                            blogs.map((value, index) => {
                                return (
                                    <>
                                        <div class="col-lg-4 blog_item_col">
                                            <div class="blog_item">
                                                <div class="blog_background" style={{ backgroundImage: `url("${value.image}")` }}></div>
                                                <div class="blog_content d-flex flex-column align-items-center justify-content-center text-center">
                                                    <h5 class="blog_title">{value.title}</h5>
                                                    <span class="blog_meta">by admin | {value.created_at}</span>
                                                    <button class="blog_more" onClick={() => navigate(`/blogs/info/${value.id}`, { replace: false })} style={{ background: "none", border: "0px" }}>Read more</button>
                                                    {/* <a class="blog_more" href={`${value.id}`} target="_blank">Read more</a> */}
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )
                            })
                        }
                    </div>

                </div>
            </div>

        </>
    )
}