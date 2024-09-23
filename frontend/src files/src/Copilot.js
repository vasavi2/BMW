
// import { useState } from 'react';
// import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
// import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator } from '@chatscope/chat-ui-kit-react';
// import AppBar from '@mui/material/AppBar';
// import Box from '@mui/material/Box';
// import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';
// import IconButton from '@mui/material/IconButton';
// import MenuIcon from '@mui/icons-material/Menu';
// // import Header from './Header';
// // import Plot from 'react-plotly.js';
// import { Drawer } from '@mui/material';
// import "./chat.css";
// import userImageQuestion from "./profile.png"; // Profile picture for question asker
// import bot from "./bot.png"
// import VolumeUpIcon from '@mui/icons-material/VolumeUp';
// import VolumeOffIcon from '@mui/icons-material/VolumeOff';

 
 
 
// function Chat() {
//   const [messages, setMessages] = useState([
//     {
//       message: `Hi,I can help you to summarize the logs✍️`,
     
//       sentTime: new Date().toLocaleTimeString(),
 
//       sender: "ChatGPT"
//     }
//   ]);
 
//   const [isTyping, setIsTyping] = useState(false);
//   // const [isImageClicked,setIsImageClicked]=useState(false)
//   const [isSpeaking, setIsSpeaking] = useState(false);
//   // const [speakingMessageId, setSpeakingMessageId] = useState(null);


//   // const handleImageClick=()=>{
//   //   setIsImageClicked((prev)=>!prev)
//   // }

//   const handleSend = async (message) => {
//     const newMessage = {
//       message,
//       direction: 'outgoing',
//             sentTime: new Date().toLocaleTimeString(),
 
//       sender: "user"
//     };
 
//     const newMessages = [...messages, newMessage];
//     setMessages(newMessages);
 
//     // Extract plain text from HTML message
//     const plainTextMessage = extractPlainText(message);
 
//     // Initial system message to determine ChatGPT functionality
//     // How it responds, how it talks, etc.
//     setIsTyping(true);
//     const responseData = await processMessageToChatGPT(plainTextMessage);

//     console.log("responseData--->",responseData)




//     if (responseData.x){
//       setMessages(prev=>[...prev,{error:responseData.x,pdfpath:responseData.pdfpath,
//         sentTime: new Date().toLocaleTimeString(),
//       }])
//     }


  

//     if(responseData.compare_graph1){

//       setMessages(prev=>[...prev,{
//         x1_comp_values:responseData.x1_values_comp1,
//         x11_comp_values:responseData.x2_values_comp2,
//         y1_values_comp:responseData.y1_values_comp,
//       sentTime: new Date().toLocaleTimeString(),
//     }])
//     }


//     if(responseData.compare_graph2){
      
//       setMessages(prev=>[...prev,{
//         xx1_values_comp1:responseData.xx1_values_comp1 ,
//         xx2_values_comp1:responseData.xx2_values_comp1        ,
//         y2_values_comp1:responseData.y2_values_comp1,
//       sentTime: new Date().toLocaleTimeString(),
//     }])
//     }

      


 
//     // Check if the response contains an image
//     if (responseData.image) {
//       // Add the image message to the message list
//       setMessages(prevMessages => [...prevMessages, {
//         message: <img src={`data:image/png;base64,${responseData.image}`} alt="Plot" />,
//         sender: "ChatGPT",
//         sentTime: new Date().toLocaleTimeString(),
 
//       }]);
//     }

//     if (responseData.x_values && responseData.y_values){
//       setMessages(prevMessages=>
//         [...prevMessages,
//         {x_values:responseData.x_values,
//           y_values:responseData.y_values,
//           sentTime: new Date().toLocaleTimeString(),
//         }
//         ])
//     }


//     if (responseData.x_values_feature && responseData.y_values_feature){
//       setMessages(prevMessages=>
//         [...prevMessages,
//         {x_values_feature:responseData.x_values_feature,
//           y_values_feature:responseData.y_values_feature,
//           sentTime: new Date().toLocaleTimeString(),
//         }
//         ])
//     }
 
//     // Check if the response contains content data
//     if (responseData.content) {
//       // Add the content message to the message list
//       setMessages(prevMessages => [...prevMessages, {
//         received_message: responseData.content,
//         sender: "ChatGPT",
//         sentTime: new Date().toLocaleTimeString(),
//         error:"error"


//       }]);
//     }


//     console.log("received message",messages)


//     if (responseData.content2) {
//       // Add the content message to the message list
//       setMessages(prevMessages => [...prevMessages, {
//         message: responseData.content2,
//         sender: "ChatGPT",
//         sentTime: new Date().toLocaleTimeString(),
// error:responseData.content2

//       }]);
//     }

    

//     if(responseData.table_content){
//       let dictionary=responseData.table_content
//         setMessages(prevMessages => [...prevMessages, {
//         message: dictionary,
//         sender: "ChatGPT",
//         sentTime: new Date().toLocaleTimeString(),
//       }]);
//     }

 
//     setIsTyping(false);
//   };
 
//   async function processMessageToChatGPT(message) {
//     try {
//       console.log("Message before sending:", message); // Log the message before sending
 
//       const response = await fetch("http://localhost:9008/receive_data_final_final2", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify({ message }) // Send only the plain text message
//       });
 
//       const data = await response.json();
//       console.log("Data from backend:", data);
//       return data; // Return the response data
 
//     } catch (error) {
//       console.error("Error fetching data:", error);
//       return {}; // Return an empty object in case of error
//     }
//   }
 
//   // Function to extract plain text from HTML message
//   const extractPlainText = (htmlMessage) => {
//     const tempDiv = document.createElement('div');
//     tempDiv.innerHTML = htmlMessage;
//     return tempDiv.textContent || tempDiv.innerText || '';
//   };

 

//   // const datas = [
//   //   {
//   //     x: messages.map(message => message.x_values).flat(),
//   //     y: messages.map(message => message.y_values).flat(),
//   //     type: 'scatter',
//   //     mode: 'lines',
//   //     name: "Comp_217FC7343A"
//   //   }
//   // ];


  


// //   const firstXValuesFeature = messages.map(message => message.x_values_feature).flat().slice(0, -288);
// // const firstYValuesFeature = messages.map(message => message.y_values_feature).flat().slice(0, -288);
// // const lastXValuesFeature = messages.map(message => message.x_values_feature).flat().slice(-288);
// // const lastYValuesFeature = messages.map(message => message.y_values_feature).flat().slice(-288);

// // const firstFeatureTrace = {
// //   x: firstXValuesFeature,
// //   y: firstYValuesFeature,
// //   type: 'scatter',
// //   mode: 'lines',
// //   name:'Comp__Vib_X_217VI7113A',
// //   line: { color: 'blue' }
// // };

// // const lastFeatureTrace = {
// //   x: lastXValuesFeature,
// //   y: lastYValuesFeature,
// //   type: 'scatter',
// //   mode: 'lines',
// //   name:'Comp__Vib_X_217VI7113A_forecast',
// //   line: { color: 'orange' }
// // };



// console.log("compare graphs ------>",messages)



// // #compare 1
// // const compare_x1Values_graph1=messages.map(message => message.x1_comp_values).flat()
// // const compare_x2Values_graph1=messages.map(message => message.x11_comp_values).flat()
// // const compare_y_Values=messages.map(message => message.y1_values_comp).flat()

// // const firstFeatureTrace_compare1 = {
// //   x: compare_y_Values,
// //   y: compare_x1Values_graph1,
// //   type: 'scatter',
// //   mode: 'lines',
// //   name:'Comp_Stage_1_Flow_217FC7343A',
// //   line: { color: 'orange' }
// // };


// // const lastFeatureTrace_compare2 = {
// //   x: compare_y_Values,
// //   y: compare_x2Values_graph1,
// //   type: 'scatter',
// //   mode: 'lines',
// //   name:'Comp_DGS_DE_Primery_Seal_Vent_Diff_217PDI7162',
// //   line: { color: 'green' }
// // };



// // const compare_xx1Values_graph1=messages.map(message => message.xx1_values_comp1).flat()
// // const compare_xx2Values_graph1=messages.map(message => message.xx2_values_comp1  ).flat()
// // const compare_y2_Values=messages.map(message => message.y2_values_comp1).flat()

// // const firstFeatureTrace_compare11 = {
// //   x: compare_y2_Values,
// //   y: compare_xx1Values_graph1,
// //   type: 'scatter',
// //   mode: 'lines',
// //   name:'Comp_Stage_1_Flow_217FC7343A',
// //   line: { color: 'orange' }
// // };


// // const lastFeatureTrace_compare22 = {
// //   x: compare_y2_Values,
// //   y: compare_xx2Values_graph1,
// //   type: 'scatter',
// //   mode: 'lines',
// //   name:'Comp_Stage_1_Suction_Press_217PI7003',
// //   line: { color: 'green' }
// // };




// const speakSentence = (sentence) => {
//   const synth = window.speechSynthesis;
//   const utterance = new SpeechSynthesisUtterance(sentence);

//   utterance.onstart = () => {
//     setIsSpeaking(true);
//   };

//   utterance.onend = () => {
//     setIsSpeaking(false);
//   };

//   synth.speak(utterance);
// };






 
 
//   return (
//     <div className="App">
 
//              <div style={{  height: "580px", width: "1360px",marginTop:"-85px" }}>
 
 
//         <Box sx={{ flexGrow: 1 }}>
//            <AppBar position="static" style={{ backgroundColor: "white" }}>
//             <Toolbar>
//                <IconButton
//                  size="large"
//                  edge="start"
//                  color="inherit"
//                  aria-label="menu"
//                  sx={{ mr: 2 }}
//                >
//                  <MenuIcon />
//                </IconButton>
//                <Typography variant="h5" component="div" sx={{ flexGrow: 1 }} style={{ marginLeft: "550px", background: "white", color: "black" }}>
//                 Copilot
//                </Typography>
//              </Toolbar>
//            </AppBar>
//         </Box>
 
//           <ChatContainer>
//             <MessageList
//               scrollBehavior="smooth"
//               typingIndicator={isTyping ? <TypingIndicator content="Thinking" /> : null}
//                           style={{ backgroundColor: '#008FD50D', color: "#64748B", width: "1350px", marginLeft: "0px" }}
 
//             >
             
//              <div className='container'>
//               <h6 style={{ color: "#64748B" }} className='title'>Today</h6>
//              </div>
 
//               {/* Render initial message */}
//               <div>
//               {/* <h1 >👤</h1> */}
//               <img src={bot} width={"50px"}  style={{borderRadius:"50%"}}/>
//               <Message model={messages[0]} />
//               <Message.Footer style={{ display: "flex", justifyContent: "end",marginRight:"1020px" }}>{messages[0].sentTime}</Message.Footer> {/* Display sent time */}
 
//               </div>
 
//               {
//                 console.log("Message--->",messages)
//               }
 
//               {messages.slice(1).map((message, i) => (
//  message.error?(
//                 <div>
//                     <Message.Header>{
//                     <img src={message.sender === "ChatGPT" ? bot : bot} width={"50px"} style={{borderRadius:"50%"}} />}         
//                     </Message.Header>



                    


// {
//   (message.error.split(" ")[0] === "Answer" || message.error.split(" ")[0]==="please"|| message.error.split(" ").some(word => word.toLowerCase().includes("refer"))) ? (
//     <div style={{border:"none",backgroundColor:"#c6e3fa",color:"black",width:"500px",borderRadius:"10px",padding:"5px"}}>
//       {message.error+"2"}
// <a href="https://storage.cloud.google.com/ahf_storage_bucket/Logs.xlsx?authuser=1" target='_blank' rel="noopener noreferrer">Please refer this document👉📄</a>
//     </div>
//   ) : (message.message)?(    <div style={{border:"none",backgroundColor:"#c6e3fa",color:"black",width:"500px",borderRadius:"10px",padding:"5px"}}>

//     {message.message}
//     </div>):
  
//   (message.received_message.split(" ").some(word=>word.toLowerCase().includes("refer")))?(
//     <div style={{border:"none",backgroundColor:"#c6e3fa",color:"black",width:"500px",borderRadius:"10px",padding:"5px"}}>
//       {message.received_message }

//       <a href="https://storage.cloud.google.com/ahf_storage_bucket/Logs.xlsx?authuser=1" target='_blank' rel="noopener noreferrer">Please refer this document👉📄</a>

//     </div>
//   ):
//   (<div style={{border:"none",backgroundColor:"#c6e3fa",color:"black",width:"500px",borderRadius:"10px",padding:"5px"}}>
//     {message.received_message}
//     </div>)
// }

                                     

// {message.message ?


// <Message.Footer
//   onClick={() => {
//     if (!isSpeaking) {
//       speakSentence(message.message);
//     } else {
//       window.speechSynthesis.cancel();
//       setIsSpeaking(false);
//     }
//   }}
//   role="img"
//   aria-label="speaker"
//   style={{
//     display: "flex",
//     justifyContent: message.sender === "ChatGPT" ? "start" : "end"
//   }}
// >
//   <div style={{ display: "flex", marginLeft: "20px", width: "500px" }}>
//   <div>
//        {message.sentTime}
//      </div>
//     <div style={{ marginLeft: "auto" }}>
//       {isSpeaking ? (
//         <VolumeUpIcon fontSize="large" className="float-end" color="black" style={{ cursor: "pointer" }} />
//       ) : (
//         <VolumeOffIcon fontSize="large" className="float-end" color="black" style={{ cursor: "pointer" }} />
//       )}
//     </div>
//   </div>
// </Message.Footer>
  
  
  
//   :

//                        <Message.Footer onClick={() => speakSentence(message.message)}
//                        role="img"
//                        aria-label="speaker" style={{ display: "flex", justifyContent: message.sender === "ChatGPT" ? "start" : "end" }}>
//                          {message.sentTime}
//                        </Message.Footer>
                      
//                        }

                       


                       
// {message.received_message ?

 


// <Message.Footer
//   onClick={() => {
//     if (!isSpeaking) {
//       speakSentence(message.received_message);
//     } else {
//       window.speechSynthesis.cancel();
//       setIsSpeaking(false);
//     }
//   }}
//   role="img"
//   aria-label="speaker"
//   style={{
//     display: "flex",
//     justifyContent: message.sender === "ChatGPT" ? "start" : "end"
//   }}
// >
//   <div style={{ display: "flex", marginLeft: "20px", width: "500px" }}>
//     <div style={{ marginLeft: "auto" }}>
//       {isSpeaking ? (
//         <VolumeUpIcon fontSize="large" className="float-end" color="black" style={{ cursor: "pointer" }} />
//       ) : (
//         <VolumeOffIcon fontSize="large" className="float-end" color="black" style={{ cursor: "pointer" }} />
//       )}
//     </div>
//   </div>
// </Message.Footer>

 
 
 
//  :

//                       ""
                     
//                       }

//   </div>
//  ):(message.xx1_values_comp1 && message.xx2_values_comp1
// && message.y2_values_comp1  )?(
// <div>
//                     <Message.Header>{
//                     <img src={message.sender === "ChatGPT" ? bot : bot} width={"50px"} style={{borderRadius:"50%"}} />}
//                     </Message.Header>
                    
                    
//   <Message.Footer style={{ display: "flex", justifyContent: "end",marginRight:"100px" }}>{message.sentTime+"3"}</Message.Footer>
             
//                   </div>
// ):

//  (message.x1_comp_values && message.x11_comp_values && message.y1_values_comp)?(
// <div>
//                     <Message.Header>{
//                     <img src={message.sender === "ChatGPT" ? bot : bot} width={"50px"} style={{borderRadius:"50%"}} />}
//                     </Message.Header>
                    
//   <Message.Footer style={{ display: "flex", justifyContent: "end",marginRight:"100px" }}>{message.sentTime+"4"}</Message.Footer>
             
//                   </div>



//  ):
// //  ("")
  
 
//           (message.message && typeof message.message === 'object' && message.message.type === 'img') ?
//                 (
//                   <div>
//                   <Message.Header>{
//                     <img src={message.sender === "ChatGPT" ? bot : userImageQuestion} width={"50px"} style={{borderRadius:"50%"}} />}
//                     </Message.Header>
                  
//                   </div>
//                 ):



//                 (message.x_values_feature && message.x_values_feature)?(

//                   <div>
//                     <Message.Header>{
//                     <img src={message.sender === "ChatGPT" ? bot : ''} width={"50px"} style={{borderRadius:"50%"}} />}
//                     </Message.Header>
                    
//                     <Message.Footer style={{ display: "flex", justifyContent: "end",marginRight:"400px" }}>{message.sentTime+"5"}</Message.Footer>
             


//                   </div>
//                 ):
                
//                 (message.x_values && message.y_values)?( 
//                   <div>
//                   <Message.Header>{
//                     <img src={message.sender === "ChatGPT" ? "": ""} width={"50px"} style={{borderRadius:"50%"}} />}
//                     </Message.Header>                 
                
//                 <Message.Footer style={{ display: "flex", justifyContent: "end",marginRight:"400px" }}>{message.sentTime+"6"}</Message.Footer>
// </div>
//                 ):(typeof message.message === 'object' && !Array.isArray(message.message)) ?

//     <>





//     <Message.Header>{
//       <img src={message.sender === "ChatGPT" ? bot : userImageQuestion} width={"50px"} style={{borderRadius:"50%"}} />
//       // <Plot data={data} layout={layout} />
//       }</Message.Header>

  

//       <table className='table table-bordered w-50  table-sucess ' style={{border:"2px solid green",color:"#c8dcdf",backgroundColor:"#c8dcdf"}} >
        
//         <tbody>
//           {
//             Object.keys(message.message).map((key)=>(
//               // count=0
//               <tr>
                

//                 {message.message[key].map((value,index)=>(
//                   <td key={index}>{value}</td>
//                 ))}
//               </tr>
    
//             ))
//           }
          
//         </tbody>
//       </table>
//       <Message.Footer style={{ display: "flex", justifyContent: "end",marginRight:"550px",marginTop:"-15px" }}>{message.sentTime+"7"}</Message.Footer>

//       </>
             
//                 : (
//                                   <div style={{ display: "flex" }}>
 
//                   <Message key={i}  model={{
//                                           message: message.sender === "ChatGPT" ? message.received_message : message.message,
//                                            sentTime: message.sentTime,
//                                            sender: message.sender,
//                                            direction: message.sender === "ChatGPT" ? "incoming" : "outgoing",
//                                            showAvatar: message.sender !== "ChatGPT",
//                                            avatarSrc: message.sender === "ChatGPT" ? bot : userImageQuestion // Set profile picture based on sender
//                                          }}
//                                          style={{ display: "flex",marginBottom:"35px" }} >
                                         
//                                           <Message.Header>{<img src={message.sender === "ChatGPT" ? bot : userImageQuestion} width={"50px"} style={{borderRadius:"50%"}} />}</Message.Header>
                   
//                                               {message.received_message ?
//                 <Message.Footer onClick={() => speakSentence(message.received_message)}
//                            role="img"
//                            aria-label="speaker" style={{ display: "flex", justifyContent: message.sender === "ChatGPT" ? "start" : "end" }}>
//                              <div style={{display:"flex",justifyContent:"space-between"}}>
//                                <div>
//                                {message.sentTime+"p2"}
//                                </div>
//                                <div style={{marginLeft:"900px"}}>
                              
//                                <VolumeUpIcon fontSize='large' color='black' style={{cursor:'pointer'}}/>
//                                </div>

//                              </div>
                             
//                     </Message.Footer>:

//                        <Message.Footer onClick={() => speakSentence(message.received_message)}
//                        role="img"
//                        aria-label="speaker" style={{ display: "flex", justifyContent: message.sender === "ChatGPT" ? "start" : "end" }}>
//                          {message.sentTime}
//                        </Message.Footer>
                      
//                        }

//                    </Message>
 
//                    </div>
//                 )
//               ))}
//             </MessageList>
//             <MessageInput placeholder="Type message here" onSend={handleSend} />
//           </ChatContainer>
//         {/* </MainContainer> */}
//       </div>
//     </div>
//   );
// }
 
// export default Chat;


// import { useState } from 'react';
// import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
// import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator } from '@chatscope/chat-ui-kit-react';
// import AppBar from '@mui/material/AppBar';
// import Box from '@mui/material/Box';
// import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';
// import IconButton from '@mui/material/IconButton';
// import MenuIcon from '@mui/icons-material/Menu';
// import { Drawer } from '@mui/material';
// import "./chat.css";
// import userImageQuestion from "./profile.png";
// import bot from "./bot.png";
// import VolumeUpIcon from '@mui/icons-material/VolumeUp';
// import VolumeOffIcon from '@mui/icons-material/VolumeOff';

// function Chat() {
//   const [messages, setMessages] = useState([
//     {
//       message: `Hi, I can help you to summarize the logs✍️`,
//       sentTime: new Date().toLocaleTimeString(),
//       sender: "ChatGPT"
//     }
//   ]);

//   const [isTyping, setIsTyping] = useState(false);
//   const [isSpeaking, setIsSpeaking] = useState(false);

//   const handleSend = async (message) => {
//     const newMessage = {
//       message,
//       direction: 'outgoing',
//       sentTime: new Date().toLocaleTimeString(),
//       sender: "user"
//     };

//     const newMessages = [...messages, newMessage];
//     setMessages(newMessages);

//     setIsTyping(true);
//     const responseData = await processMessageToChatGPT(message);

//     if (responseData.table_content) {
//       const tableData = parseLogData(responseData.table_content);
//       setMessages(prev => [...prev, { table: tableData, sentTime: new Date().toLocaleTimeString(), sender: "ChatGPT" }]);
//     } else {
//       setMessages(prev => [...prev, { message: responseData.content, sentTime: new Date().toLocaleTimeString(), sender: "ChatGPT" }]);
//     }

//     setIsTyping(false);
//   };

//   async function processMessageToChatGPT(message) {
//     try {
//       const response = await fetch("http://localhost:9008/receive_data_final_final2", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify({ message })
//       });

//       const data = await response.json();
//       return data;
//     } catch (error) {
//       console.error("Error fetching data:", error);
//       return {};
//     }
//   }

//   function parseLogData(logData) {
//     const lines = logData.split('|').filter(line => line.trim() !== '');
//     const headers = ["Log Type", "Timestamp", "Severity", "Thread Name", "Message", "File Name", "File Line", "Function", "Exec ID", "Pod ID", "Job ID", "Node ID", "Status", "Phase"];
//     const rows = lines.map(line => {
//       const cells = line.split(',').map(cell => cell.trim());
//       return cells;
//     });

//     return { headers, rows };
//   }

//   const speakSentence = (sentence) => {
//     const synth = window.speechSynthesis;
//     const utterance = new SpeechSynthesisUtterance(sentence);

//     utterance.onstart = () => {
//       setIsSpeaking(true);
//     };

//     utterance.onend = () => {
//       setIsSpeaking(false);
//     };

//     synth.speak(utterance);
//   };

//   return (
//     <div className="App">
//       <div style={{ height: "580px", width: "1360px", marginTop: "-85px" }}>
//         <Box sx={{ flexGrow: 1 }}>
//           <AppBar position="static" style={{ backgroundColor: "white" }}>
//             <Toolbar>
//               <IconButton
//                 size="large"
//                 edge="start"
//                 color="inherit"
//                 aria-label="menu"
//                 sx={{ mr: 2 }}
//               >
//                 <MenuIcon />
//               </IconButton>
//               <Typography variant="h5" component="div" sx={{ flexGrow: 1 }} style={{ marginLeft: "550px", background: "white", color: "black" }}>
//                 Copilot
//               </Typography>
//             </Toolbar>
//           </AppBar>
//         </Box>

//         <ChatContainer>
//           <MessageList
//             scrollBehavior="smooth"
//             typingIndicator={isTyping ? <TypingIndicator content="Thinking" /> : null}
//             style={{ backgroundColor: '#008FD50D', color: "#64748B", width: "1350px", marginLeft: "0px" }}
//           >
//             <div className='container'>
//               <h6 style={{ color: "#64748B" }} className='title'>Today</h6>
//             </div>

//             {messages.slice(1).map((message, i) => (
//               message.table ? (
//                 <div key={i}>
//                   <Message.Header>{<img src={message.sender === "ChatGPT" ? bot : userImageQuestion} width={"50px"} style={{ borderRadius: "50%" }} />}</Message.Header>
//                   <table className='table table-bordered w-50 table-success' style={{ border: "2px solid green", color: "#c8dcdf", backgroundColor: "#c8dcdf" }}>
//                     <thead>
//                       <tr>
//                         {message.table.headers.map((header, index) => (
//                           <th key={index}>{header}</th>
//                         ))}
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {message.table.rows.map((row, rowIndex) => (
//                         <tr key={rowIndex}>
//                           {row.map((cell, cellIndex) => (
//                             <td key={cellIndex}>{cell}</td>
//                           ))}
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                   <Message.Footer style={{ display: "flex", justifyContent: "end", marginRight: "550px", marginTop: "-15px" }}>{message.sentTime}</Message.Footer>
//                 </div>
//               ) : (
//                 <Message key={i} model={{
//                   message: message.sender === "ChatGPT" ? message.message : message.message,
//                   sentTime: message.sentTime,
//                   sender: message.sender,
//                   direction: message.sender === "ChatGPT" ? "incoming" : "outgoing",
//                   showAvatar: message.sender !== "ChatGPT",
//                   avatarSrc: message.sender === "ChatGPT" ? bot : userImageQuestion
//                 }}
//                   style={{ display: "flex", marginBottom: "35px" }} >
//                   <Message.Header>{<img src={message.sender === "ChatGPT" ? bot : userImageQuestion} width={"50px"} style={{ borderRadius: "50%" }} />}</Message.Header>
//                   {message.received_message ?
//                     <Message.Footer onClick={() => speakSentence(message.received_message)}
//                       role="img"
//                       aria-label="speaker" style={{ display: "flex", justifyContent: message.sender === "ChatGPT" ? "start" : "end" }}>
//                       <div style={{ display: "flex", justifyContent: "space-between" }}>
//                         <div>
//                           {message.sentTime}
//                         </div>
//                         <div style={{ marginLeft: "900px" }}>
//                           <VolumeUpIcon fontSize='large' color='black' style={{ cursor: 'pointer' }} />
//                         </div>
//                       </div>
//                     </Message.Footer> :
//                     <Message.Footer onClick={() => speakSentence(message.received_message)}
//                       role="img"
//                       aria-label="speaker" style={{ display: "flex", justifyContent: message.sender === "ChatGPT" ? "start" : "end" }}>
//                       {message.sentTime}
//                     </Message.Footer>
//                   }
//                 </Message>
//               )
//             ))}
//           </MessageList>
//           <MessageInput placeholder="Type message here" onSend={handleSend} />
//         </ChatContainer>
//       </div>
//     </div>
//   );
// }

// export default Chat;



// import { useState } from 'react';
// import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
// import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator } from '@chatscope/chat-ui-kit-react';
// import AppBar from '@mui/material/AppBar';
// import Box from '@mui/material/Box';
// import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';
// import IconButton from '@mui/material/IconButton';
// import MenuIcon from '@mui/icons-material/Menu';
// import { Drawer } from '@mui/material';
// import "./chat.css";
// import userImageQuestion from "./profile.png";
// import bot from "./bot.png";
// import VolumeUpIcon from '@mui/icons-material/VolumeUp';
// import VolumeOffIcon from '@mui/icons-material/VolumeOff';

// function Chat() {
//   const [messages, setMessages] = useState([
//     {
//       message: `Hi, I can help you to summarize the logs✍️`,
//       sentTime: new Date().toLocaleTimeString(),
//       sender: "ChatGPT"
//     }
//   ]);

//   const [isTyping, setIsTyping] = useState(false);
//   const [isSpeaking, setIsSpeaking] = useState(false);

//   const handleSend = async (message) => {
//     const newMessage = {
//       message,
//       direction: 'outgoing',
//       sentTime: new Date().toLocaleTimeString(),
//       sender: "user"
//     };

//     const newMessages = [...messages, newMessage];
//     setMessages(newMessages);

//     setIsTyping(true);
//     const responseData = await processMessageToChatGPT(message);

//     if (responseData.table_content) {
//       const tableData = parseLogData(responseData.table_content);
//       setMessages(prev => [...prev, { table: tableData, sentTime: new Date().toLocaleTimeString(), sender: "ChatGPT" }]);
//     } else {
//       setMessages(prev => [...prev, { message: responseData.content, sentTime: new Date().toLocaleTimeString(), sender: "ChatGPT" }]);
//     }

//     setIsTyping(false);
//   };

//   async function processMessageToChatGPT(message) {
//     try {
//       const response = await fetch("http://localhost:9008/receive_data_final_final2", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify({ message })
//       });

//       const data = await response.json();
//       return data;
//     } catch (error) {
//       console.error("Error fetching data:", error);
//       return {};
//     }
//   }

//   function parseLogData(logData) {
//     const lines = logData.split('\n').filter(line => line.trim() !== '');
//     const headers = lines[0].split('|').map(header => header.trim()).filter(header => header !== '');
//     const rows = lines.slice(1).map(line => {
//       const cells = line.split('|').map(cell => cell.trim()).filter(cell => cell !== '');
//       return cells;
//     });

//     return { headers, rows };
//   }

//   const speakSentence = (sentence) => {
//     const synth = window.speechSynthesis;
//     const utterance = new SpeechSynthesisUtterance(sentence);

//     utterance.onstart = () => {
//       setIsSpeaking(true);
//     };

//     utterance.onend = () => {
//       setIsSpeaking(false);
//     };

//     synth.speak(utterance);
//   };

//   return (
//     <div className="App">
//       <div style={{ height: "580px", width: "1360px", marginTop: "-85px" }}>
//         <Box sx={{ flexGrow: 1 }}>
//           <AppBar position="static" style={{ backgroundColor: "white" }}>
//             <Toolbar>
//               <IconButton
//                 size="large"
//                 edge="start"
//                 color="inherit"
//                 aria-label="menu"
//                 sx={{ mr: 2 }}
//               >
//                 <MenuIcon />
//               </IconButton>
//               <Typography variant="h5" component="div" sx={{ flexGrow: 1 }} style={{ marginLeft: "550px", background: "white", color: "black" }}>
//                 Copilot
//               </Typography>
//             </Toolbar>
//           </AppBar>
//         </Box>

//         <ChatContainer>
//           <MessageList
//             scrollBehavior="smooth"
//             typingIndicator={isTyping ? <TypingIndicator content="Thinking" /> : null}
//             style={{ backgroundColor: '#008FD50D', color: "#64748B", width: "1350px", marginLeft: "0px" }}
//           >
//             <div className='container'>
//               <h6 style={{ color: "#64748B" }} className='title'>Today</h6>
//             </div>

//             {messages.slice(1).map((message, i) => (
//               message.table ? (
//                 <div key={i}>
//                   <Message.Header>{<img src={message.sender === "ChatGPT" ? bot : userImageQuestion} width={"50px"} style={{ borderRadius: "50%" }} />}</Message.Header>
//                   <table className='table table-bordered w-50 table-success' style={{ border: "2px solid green", color: "#c8dcdf", backgroundColor: "#c8dcdf" }}>
//                     <thead>
//                       <tr>
//                         {message.table.headers.map((header, index) => (
//                           <th key={index}>{header}</th>
//                         ))}
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {message.table.rows.map((row, rowIndex) => (
//                         <tr key={rowIndex}>
//                           {row.map((cell, cellIndex) => (
//                             <td key={cellIndex}>{cell}</td>
//                           ))}
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                   <Message.Footer style={{ display: "flex", justifyContent: "end", marginRight: "550px", marginTop: "-15px" }}>{message.sentTime}</Message.Footer>
//                 </div>
//               ) : (
//                 <Message key={i} model={{
//                   message: message.sender === "ChatGPT" ? message.message : message.message,
//                   sentTime: message.sentTime,
//                   sender: message.sender,
//                   direction: message.sender === "ChatGPT" ? "incoming" : "outgoing",
//                   showAvatar: message.sender !== "ChatGPT",
//                   avatarSrc: message.sender === "ChatGPT" ? bot : userImageQuestion
//                 }}
//                   style={{ display: "flex", marginBottom: "35px" }} >
//                   <Message.Header>{<img src={message.sender === "ChatGPT" ? bot : userImageQuestion} width={"50px"} style={{ borderRadius: "50%" }} />}</Message.Header>
//                   {message.received_message ?
//                     <Message.Footer onClick={() => speakSentence(message.received_message)}
//                       role="img"
//                       aria-label="speaker" style={{ display: "flex", justifyContent: message.sender === "ChatGPT" ? "start" : "end" }}>
//                       <div style={{ display: "flex", justifyContent: "space-between" }}>
//                         <div>
//                           {message.sentTime}
//                         </div>
//                         <div style={{ marginLeft: "900px" }}>
//                           <VolumeUpIcon fontSize='large' color='black' style={{ cursor: 'pointer' }} />
//                         </div>
//                       </div>
//                     </Message.Footer> :
//                     <Message.Footer onClick={() => speakSentence(message.received_message)}
//                       role="img"
//                       aria-label="speaker" style={{ display: "flex", justifyContent: message.sender === "ChatGPT" ? "start" : "end" }}>
//                       {message.sentTime}
//                     </Message.Footer>
//                   }
//                 </Message>
//               )
//             ))}
//           </MessageList>
//           <MessageInput placeholder="Type message here" onSend={handleSend} />
//         </ChatContainer>
//       </div>
//     </div>
//   );
// }

// export default Chat;


// import { useState } from 'react';
// import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
// import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator } from '@chatscope/chat-ui-kit-react';
// import AppBar from '@mui/material/AppBar';
// import Box from '@mui/material/Box';
// import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';
// import IconButton from '@mui/material/IconButton';
// import MenuIcon from '@mui/icons-material/Menu';
// import { Drawer } from '@mui/material';
// import "./chat.css";
// import userImageQuestion from "./profile.png";
// import bot from "./bot.png";
// import VolumeUpIcon from '@mui/icons-material/VolumeUp';
// import VolumeOffIcon from '@mui/icons-material/VolumeOff';
 
// function Chat() {
//   const [messages, setMessages] = useState([
//     {
//       message: `Hi, I can help you to summarize the logs✍️`,
//       sentTime: new Date().toLocaleTimeString(),
//       sender: "ChatGPT"
//     }
//   ]);
 
//   const [isTyping, setIsTyping] = useState(false);
//   const [isSpeaking, setIsSpeaking] = useState(false);
 
//   const handleSend = async (message) => {
//     const newMessage = {
//       message,
//       direction: 'outgoing',
//       sentTime: new Date().toLocaleTimeString(),
//       sender: "user"
//     };
 
//     const newMessages = [...messages, newMessage];
//     setMessages(newMessages);
 
//     setIsTyping(true);
//     const responseData = await processMessageToChatGPT(message);
 
//     if (responseData.table_content) {
//       const tableData = parseLogData(responseData.table_content);
//       setMessages(prev => [...prev, { table: tableData, sentTime: new Date().toLocaleTimeString(), sender: "ChatGPT" }]);
//     } else {
//       setMessages(prev => [...prev, { message: responseData.content, sentTime: new Date().toLocaleTimeString(), sender: "ChatGPT" }]);
//     }
 
//     setIsTyping(false);
//   };
 
//   async function processMessageToChatGPT(message) {
//     try {
// const response = await fetch("http://localhost:9008/receive_data_final_final2", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify({ message })
//       });
 
//       const data = await response.json();
//       return data;
//     } catch (error) {
//       console.error("Error fetching data:", error);
//       return {};
//     }
//   }
 
//   function parseLogData(logData) {
//     const lines = logData.split('\n').filter(line => line.trim() !== '');
 
//     if (lines.length < 2) {
//       return { headers: [], rows: [] };
//     }
 
//     const headers = lines[0].split('|').map(header => header.trim());
//     const rows = lines.slice(1).map(line => {
//       const cells = line.split('|').map(cell => cell.trim());
//       return cells;
//     });
 
//     return { headers, rows };
//   }
 
//   const speakSentence = (sentence) => {
//     const synth = window.speechSynthesis;
//     const utterance = new SpeechSynthesisUtterance(sentence);
 
//     utterance.onstart = () => {
//       setIsSpeaking(true);
//     };
 
//     utterance.onend = () => {
//       setIsSpeaking(false);
//     };
 
//     synth.speak(utterance);
//   };
 
//   return (
//     <div className="App">
//       <div style={{ height: "580px", width: "1360px", marginTop: "-85px" }}>
//         <Box sx={{ flexGrow: 1 }}>
//           <AppBar position="static" style={{ backgroundColor: "white" }}>
//             <Toolbar>
//               <IconButton
//                 size="large"
//                 edge="start"
//                 color="inherit"
//                 aria-label="menu"
//                 sx={{ mr: 2 }}
//               >
//                 <MenuIcon />
//               </IconButton>
//               <Typography variant="h5" component="div" sx={{ flexGrow: 1 }} style={{ marginLeft: "550px", background: "white", color: "black" }}>
//                 Copilot
//               </Typography>
//             </Toolbar>
//           </AppBar>
//         </Box>
 
//         <ChatContainer>
//           <MessageList
//             scrollBehavior="smooth"
//             typingIndicator={isTyping ? <TypingIndicator content="Thinking" /> : null}
//             style={{ backgroundColor: '#008FD50D', color: "#64748B", width: "1350px", marginLeft: "0px" }}
//           >
//             <div className='container'>
//               <h6 style={{ color: "#64748B" }} className='title'>Today</h6>
//             </div>
 
//             {messages.slice(1).map((message, i) => (
//               message.table ? (
//                 <div key={i}>
//                   <Message.Header>{<img src={message.sender === "ChatGPT" ? bot : userImageQuestion} width={"50px"} style={{ borderRadius: "50%" }} />}</Message.Header>
//                   <table className='table table-bordered w-50 table-success' style={{ border: "2px solid green", color: "#c8dcdf", backgroundColor: "#c8dcdf" }}>
//                     <thead>
//                       <tr>
//                         {message.table.headers.map((header, index) => (
//                           <th key={index}>{header}</th>
//                         ))}
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {message.table.rows.map((row, rowIndex) => (
//                         <tr key={rowIndex}>
//                           {row.map((cell, cellIndex) => (
//                             <td key={cellIndex}>{cell}</td>
//                           ))}
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                   <Message.Footer style={{ display: "flex", justifyContent: "end", marginRight: "550px", marginTop: "-15px" }}>{message.sentTime}</Message.Footer>
//                 </div>
//               ) : (
//                 <Message key={i} model={{
//                   message: message.sender === "ChatGPT" ? message.message : message.message,
//                   sentTime: message.sentTime,
//                   sender: message.sender,
//                   direction: message.sender === "ChatGPT" ? "incoming" : "outgoing",
//                   showAvatar: message.sender !== "ChatGPT",
//                   avatarSrc: message.sender === "ChatGPT" ? bot : userImageQuestion
//                 }}
//                   style={{ display: "flex", marginBottom: "35px" }} >
//                   <Message.Header>{<img src={message.sender === "ChatGPT" ? bot : userImageQuestion} width={"50px"} style={{ borderRadius: "50%" }} />}</Message.Header>
//                   {message.received_message ?
//                     <Message.Footer onClick={() => speakSentence(message.received_message)}
//                       role="img"
//                       aria-label="speaker" style={{ display: "flex", justifyContent: message.sender === "ChatGPT" ? "start" : "end" }}>
//                       <div style={{ display: "flex", justifyContent: "space-between" }}>
//                         <div>
//                           {message.sentTime}
//                         </div>
//                         <div style={{ marginLeft: "900px" }}>
//                           <VolumeUpIcon fontSize='large' color='black' style={{ cursor: 'pointer' }} />
//                         </div>
//                       </div>
//                     </Message.Footer> :
//                     <Message.Footer onClick={() => speakSentence(message.received_message)}
//                       role="img"
//                       aria-label="speaker" style={{ display: "flex", justifyContent: message.sender === "ChatGPT" ? "start" : "end" }}>
//                       {message.sentTime}
//                     </Message.Footer>
//                   }
//                 </Message>
//               )
//             ))}
//           </MessageList>
//           <MessageInput placeholder="Type message here" onSend={handleSend} />
//         </ChatContainer>
//       </div>
//     </div>
//   );
// }
 
// export default Chat;



import { useState } from 'react';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator } from '@chatscope/chat-ui-kit-react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Drawer } from '@mui/material';
import "./chat.css";
import userImageQuestion from "./profile.png";
import bot from "./bot.png";
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
 
function Chat() {
  const [messages, setMessages] = useState([
    {
      message: `Hi, I can help you to summarize the logs✍️`,
      sentTime: new Date().toLocaleTimeString(),
      sender: "ChatGPT"
    }
  ]);
 
  const [isTyping, setIsTyping] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
 
  const handleSend = async (message) => {
    const newMessage = {
      message,
      direction: 'outgoing',
      sentTime: new Date().toLocaleTimeString(),
      sender: "user"
    };
 
    const newMessages = [...messages, newMessage];
    setMessages(newMessages);
 
    setIsTyping(true);
    const responseData = await processMessageToChatGPT(message);
 
    if (responseData.table_content) {
      const tableData = parseLogData(responseData.table_content);
      setMessages(prev => [...prev, { table: tableData, sentTime: new Date().toLocaleTimeString(), sender: "ChatGPT" }]);
    } else {
      setMessages(prev => [...prev, { message: responseData.content, sentTime: new Date().toLocaleTimeString(), sender: "ChatGPT" }]);
    }
 
    setIsTyping(false);
  };
 
  async function processMessageToChatGPT(message) {
    try {
const response = await fetch("http://localhost:9008/receive_data_final_final2", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ message })
      });
 
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      return {};
    }
  }
 
  function parseLogData(logData) {
    const lines = logData.split('\n').filter(line => line.trim() !== '' && !line.includes('---'));
 
    if (lines.length < 2) {
      return { headers: [], rows: [] };
    }
 
    const headers = lines[0].split(',').map(header => header.trim());
    const rows = lines.slice(1).map(line => {
      const cells = line.split(',').map(cell => cell.trim());
      return cells;
    });
 
    return { headers, rows };
  }
 
  const speakSentence = (sentence) => {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(sentence);
 
    utterance.onstart = () => {
      setIsSpeaking(true);
    };
 
    utterance.onend = () => {
      setIsSpeaking(false);
    };
 
    synth.speak(utterance);
  };
 
  return (
    <div className="App">
      <div style={{ height: "580px", width: "1360px", marginTop: "-85px" }}>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static" style={{ backgroundColor: "white" }}>
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h5" component="div" sx={{ flexGrow: 1 }} style={{ marginLeft: "550px", background: "white", color: "black" }}>
                Copilot
              </Typography>
            </Toolbar>
          </AppBar>
        </Box>
 
        <ChatContainer>
          <MessageList
            scrollBehavior="smooth"
            typingIndicator={isTyping ? <TypingIndicator content="Thinking" /> : null}
            style={{ backgroundColor: '#008FD50D', color: "#64748B", width: "1350px", marginLeft: "0px" }}
          >
            <div className='container'>
              <h6 style={{ color: "#64748B" }} className='title'>Today</h6>
            </div>
 
            {messages.slice(1).map((message, i) => (
              message.table ? (
                <div key={i}>
                  <Message.Header>{<img src={message.sender === "ChatGPT" ? bot : userImageQuestion} width={"50px"} style={{ borderRadius: "50%" }} />}</Message.Header>
                  <table className='table table-bordered table-success w-50' style={{ border: "2px solid green", color: "#c8dcdf", backgroundColor: "#c8dcdf" }}>
                    <thead>
                      <tr>
                        {message.table.headers.map((header, index) => (
                          <th key={index}>{header}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {message.table.rows.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                          {row.map((cell, cellIndex) => (
                            <td key={cellIndex}>{cell}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <Message.Footer style={{ display: "flex", justifyContent: "end", marginRight: "550px", marginTop: "-15px" }}>{message.sentTime}</Message.Footer>
                </div>
              ) : (
                <Message key={i} model={{
                  message: message.sender === "ChatGPT" ? message.message : message.message,
                  sentTime: message.sentTime,
                  sender: message.sender,
                  direction: message.sender === "ChatGPT" ? "incoming" : "outgoing",
                  showAvatar: message.sender !== "ChatGPT",
                  avatarSrc: message.sender === "ChatGPT" ? bot : userImageQuestion
                }}
                  style={{ display: "flex", marginBottom: "35px" }} >
                  <Message.Header>{<img src={message.sender === "ChatGPT" ? bot : userImageQuestion} width={"50px"} style={{ borderRadius: "50%" }} />}</Message.Header>
                  {message.received_message ?
                    <Message.Footer onClick={() => speakSentence(message.received_message)}
                      role="img"
                      aria-label="speaker" style={{ display: "flex", justifyContent: message.sender === "ChatGPT" ? "start" : "end" }}>
                      <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <div>
                          {message.sentTime}
                        </div>
                        <div style={{ marginLeft: "900px" }}>
                          <VolumeUpIcon fontSize='large' color='black' style={{ cursor: 'pointer' }} />
                        </div>
                      </div>
                    </Message.Footer> :
                    <Message.Footer onClick={() => speakSentence(message.received_message)}
                      role="img"
                      aria-label="speaker" style={{ display: "flex", justifyContent: message.sender === "ChatGPT" ? "start" : "end" }}>
                      {message.sentTime}
                    </Message.Footer>
                  }
                </Message>
              )
            ))}
          </MessageList>
          <MessageInput placeholder="Type message here" onSend={handleSend} />
        </ChatContainer>
      </div>
    </div>
  );
}
 
export default Chat;
