import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
export function BlogDetail(props) {
    const [blog, setBlog] = useState({});
    const [loading, setLoading] = useState(true);
    let navigate = useNavigate();
    let params = useParams();
    useEffect(() => {
        axios.post("api/blogs/info", params).then(res => { setBlog(res.data.blog); setLoading(false); })
    }, [])
    return (
        <>
            {loading ? "" :
                <>
                    <button style={{ float: "left", }} className="btn btn-outline-secondary" onClick={() => navigate(-1)}>
                        <i class="fa fa-long-arrow-left" aria-hidden="true"></i>
                    </button>
                    <h1>{blog.title}</h1>
                    <br />
                    <img src={`${blog.image}`} />
                    <br />
                    <p>{blog.content}</p>
                    <p>{blog.footer}</p>

                </>
            }
        </>
    )
}