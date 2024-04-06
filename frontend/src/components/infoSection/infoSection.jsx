import styles from "./info.module.css"
export default function InfoSection(){
    return(
        <>
        <div className={styles.info_section}>
                <div className={styles.info_container}>
                    <img src="https://lrwonline.com/wp-content/uploads/2019/03/BLOG-Sad-Dog-1200x900-1200x900.jpg"></img>
                    <div className={styles.image_description}>
                        <h1>Why Adopt</h1>
                        <p>Why adopt? Because every pet deserves a loving home, and you can be the one to provide it. When you adopt, you're not just getting a pet; you're saving a life and gaining a loyal companion who will bring endless joy into your world. Plus, adoption is a rewarding experience that fills your heart with love and gratitude. So, why wait? Start your journey of compassion today and adopt a pet in need.
                        </p>
                    </div>
                </div>

           

            
            </div>
        </>
    )
}