import styles from  "./footer.module.css"
export default function Footer(){
    return(
        <>
<footer className={styles.module}>
    <div className={styles.footer_container}>
        <div className={styles.footer_col_1}>
            <h1 className={styles.logo}>LOGO</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo sequi quidem atque veniam neque a in
                unde labore delectus numquam?</p>

            <div className={styles.additional_info}>
                <p>Add: Jhamsikhel,Lalitpur</p>
                <p>Call: 01-4314612</p>
                <p>Email: info@edublink.com</p>
            </div>
        </div>

        <div className={styles.footer_wrapper}>
            <div className={styles.footer_col_2}>
                <h2>Link Title</h2>
                <a href="#">Home</a>
                <a href="#">Homeeeeee</a>
                <a href="#">Home</a>
                <a href="#">Home</a>
                <a href="#">Home</a>
                <a href="#">Home</a>
            </div>

            <div className={styles.footer_col_3}>
                <h2>Link Title</h2>
                <a href="#">Home</a>
                <a href="#">Home</a>
                <a href="#">Home</a>
                <a href="#">Home</a>
                <a href="#">Home</a>
                <a href="#">Home</a>
            </div>

            <div className={styles.footer_col_4}>
                <h2>Link Title</h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime, distinctio Lorem ipsum dolor sit
                    amet.</p>
            
            </div>
        </div>
    </div>
</footer>

        </>
    )
}