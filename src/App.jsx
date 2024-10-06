import { useForm } from "react-hook-form"
import { useState } from "react"
import "./App.css"
function App() {
  const [passShow, setPassShow] = useState(false)
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm()

  const showPassword = () => {
    setPassShow(!passShow)
  }

  const delay = (d)=>{
    return new Promise((resolve,reject)=>{
      setTimeout(() => {
        resolve()
      }, d*1000);
    })
  }

  const onSubmit = async (data) => {
    await delay(2)
    console.log(data)
    if(data.username!=="raghav"){
      setError("myform",{message:"invalid username"})
    }
  }
  return (
    <>
    {isSubmitting && <div>Loading...</div>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <input placeholder="Username" {...register("username", {
          required: { value: true, message: "This field is required" },
          minLength: { value: 3, message: "minimum length should be 3" }, maxLength: { value: 10, message: "maximum length of 10 is required" }
        })} type="text" />
        {errors.username && <div className="red">{errors.username.message}</div>}
        <br />
        <input placeholder="Password" type={passShow ? "text" : "password"} {...register("password", {
           required: { value: true, message: "Please enter your password" } ,
             minLength: {value:6, message: "minimum length of password should be 6" },
              maxLength: { value: 16, message: "not more than 16 letters" }})} />
              <br />
        {errors.password && <div className="red">{errors.password.message}</div>}
        <br />
        <input type="checkbox" checked={passShow} onChange={showPassword} />Show Password
        <br />
        <input disabled={isSubmitting} type="submit" value="submit" />
          {errors.myform && <div className="red">{errors.myform.message}</div>}
        
      </form>
    </>
  )
}

export default App
