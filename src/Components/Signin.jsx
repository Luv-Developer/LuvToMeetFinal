import React from "react"
import {supabase} from "../../SupabaseClient"
import "./Signin.css"

const Signin = () => {
    const signin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/room`,
        queryParams: {
          prompt: 'select_account', // ✅ force Google to show account picker
          response_mode: 'query',
        },
      },
    });
  };
    return(
        <>
         <div className="container">
        <div className="info-panel">
            <div className="floating-shapes">
                <div className="shape shape-1"></div>
                <div className="shape shape-2"></div>
                <div className="shape shape-3"></div>
            </div>
            
            <div className="logo">
                <i className="fas fa-video logo-icon"></i>
                <span>LuvToMeet</span>
            </div>
            
            <h1>LuvToMeet</h1>
            <h2>Secure Video Conferencing Reimagined</h2>
            <p>Connect with colleagues, friends, and teams through high-quality, encrypted video meetings with advanced collaboration features.</p>
            
            <ul className="features-list">
                <li>
                    <i className="fas fa-shield-alt"></i>
                    <span>End-to-end encryption for all meetings</span>
                </li>
                <li>
                    <i className="fas fa-users"></i>
                    <span>Support for up to 100 participants</span>
                </li>
                <li>
                    <i className="fas fa-desktop"></i>
                    <span>Live screen sharing & collaboration</span>
                </li>
                <li>
                    <i className="fas fa-link"></i>
                    <span>Easy meeting link sharing</span>
                </li>
            </ul>
            
            <div className="security-badge">
                <h3>
                    <i className="fas fa-lock"></i>
                    Your Data Security Is Our Priority
                </h3>
                <p>We use industry-leading encryption protocols to ensure your conversations, files, and data remain private and secure. Your information is never sold to third parties.</p>
                <button 
    id="learnMoreSecurity" 
    style={{
        marginTop: "15px", 
        background: "none", 
        border: "1px solid rgba(255,255,255,0.3)", 
        color: "white", 
        padding: "8px 16px", 
        borderRadius: "20px", 
        cursor: "pointer", 
        fontSize: "0.9rem", 
        transition: "all 0.3s"
    }} 
    onMouseOver={(e) => e.target.style.background = 'rgba(255,255,255,0.1)'} 
    onMouseOut={(e) => e.target.style.background = 'none'}
>
                    Learn more about our security
                </button>
            </div>
        </div>
        
        <div className="form-panel">
            <div className="form-container">
                <div className="form-header">
                    <h2>Welcome Buddy</h2>
                    <p>Sign in to access your meetings and collaborate securely</p>
                </div>
                
                <button onClick={signin} className="google-signin-btn" id="googleSignInBtn">
                    <i className="fab fa-google google-icon"></i>
                    Sign in with Google
                </button>
                
                <div className="divider">
                    <span>Secure & Encrypted</span>
                </div>
                
                <div className="alternative-options">
                    <p style={{marginTop:"10px" , fontSize:"0.9rem"}}>
                        <i className="fas fa-info-circle" style={{color: "var(--accent)"}}></i>
                        By signing in, you agree to our <a href="#" style={{fontWeight: "normal"}}>Privacy Policy</a> and <a href="#" style={{fontWeight: "normal"}}>Terms of Service</a>
                    </p>
                </div>
            </div>
        </div>
        
        <div className="security-modal" id="securityModal">
            <div className="modal-content">
                <button className="modal-close" id="closeModal">&times;</button>
                <h3><i className="fas fa-shield-alt"></i> Our Security Commitment</h3>
                <p>At LuvToMeet, we implement multiple layers of security to protect your data and privacy during video conferences.</p>
                
                <ul className="security-points">
                    <li>
                        <i className="fas fa-check-circle"></i>
                        <div>
                            <strong>End-to-End Encryption</strong>
                            <p>All video, audio, and screen sharing data is encrypted from sender to recipient, ensuring no third party can access your meetings.</p>
                        </div>
                    </li>
                    <li>
                        <i className="fas fa-check-circle"></i>
                        <div>
                            <strong>Secure Authentication</strong>
                            <p>We use OAuth 2.0 for secure sign-in with providers like Google, ensuring your credentials are never stored on our servers.</p>
                        </div>
                    </li>
                    <li>
                        <i className="fas fa-check-circle"></i>
                        <div>
                            <strong>Data Privacy</strong>
                            <p>We adhere to GDPR, CCPA, and other global privacy regulations. Your data is never sold or shared for advertising purposes.</p>
                        </div>
                    </li>
                    <li>
                        <i className="fas fa-check-circle"></i>
                        <div>
                            <strong> Meeting Security</strong>
                            <p>Meeting hosts have controls to prevent unauthorized access, including waiting rooms, passcodes, and participant removal.</p>
                        </div>
                    </li>
                    <li>
                        <i className="fas fa-check-circle"></i>
                        <div>
                            <strong>Regular Security Audits</strong>
                            <p>Our systems undergo independent security audits and penetration testing to identify and address potential vulnerabilities.</p>
                        </div>
                    </li>
                </ul>
                
                <p style={{fontSize:"0.9rem", color: "var(--gray)"}}>
                    <i className="fas fa-info-circle"></i>
                    For detailed technical information about our security infrastructure, please visit our <a href="#" style={{color: "var(--primary)"}}>Security Center</a>.
                </p>
            </div>
        </div>
        
        <div className="loading" id="loading">
            <div className="spinner"></div>
            <p>Securely connecting to LuvToMeet...</p>
        </div>
    </div>
        </>
    )
}

export default Signin