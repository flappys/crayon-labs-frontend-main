
import Icon from '../images/logo.png'
import hero from '../images/bgs.png'
import lineicon from '../images/lines.png'
import l1 from '../images/l1.png'
import l2 from '../images/l2.png'
import l3 from '../images/l3.png'
import l4 from '../images/l4.png'
import l5 from '../images/l5.png'
import g1 from '../images/creativity.png'
import g2 from '../images/contract.png'
import g3 from '../images/podium.png'
import g4 from '../images/rocket.png'
import g5 from '../images/robot.png'
import g6 from '../images/whitelists.png'
import g7 from '../images/art.png'
import g8 from '../images/supports.png'
import p1 from '../images/mail.png'
import p2 from '../images/twitter.png'
import p3 from '../images/crayons.png'
import SIDE from '../images/support.png'
import FAQ from '../images/faq.png'
import BG from '../images/bg.png';
import solana from '../images/solana.png'
import avalanche from '../images/avalanche.png'
import eth from '../images/eth.png'
import near from '../images/near.png'
import poly from '../images/poly.png'
import Binance from '../images/binance.png'
import Fantom from '../images/fantom.png'
import carbon_folder from '../images/carbon_folder.svg'
import upload from '../images/upload.svg'
import whitelist from '../images/whitelist.svg'
import wizard from '../images/wizard.svg'
import mdl from '../images/wizard.svg'
import AccordionToggleDown from '../images/arrow_down.png'
import AccordionToggleUp from '../images/arrow_up.png'
import my_projects_circle from '../images/my_projects_circle.png'
import whitelist_circle from '../images/whitelist_circle.png'
import minting_circle from '../images/minting_circle.png'
import support_circle from '../images/support_circle.png'
import wizard_circle from '../images/wizard_circle.png'
import upload_circle from '../images/upload_circle.png'
import sent_mail from '../images/sent_mail.svg'
import cap from '../images/cap.svg'
import plus from '../images/plus.svg'
import minus from '../images/minus.svg'
import button_layer_icon from '../images/create_layers.png'
import add_wiz_icon from '../images/add_wiz_icon.png'
import Generate_collection from '../images/Generate_collection.png'
import delete_button_icon from '../images/delete2.png'

export const MY_PROJECT_CONTENT = {
  accordionToggleDown: AccordionToggleDown,
  accordionToggleUp: AccordionToggleUp,
  faqIcon: FAQ,
  accordion: [
    {
      accordion_id: 1,
      accordion_trigger: true,
      tab_id: 1,
      modal_icon: mdl,
      imgArr: [
        { imgUrl: carbon_folder, id: 1, name: "Project Details",route:"/tesy" },
        { imgUrl: wizard, id: 2, name: "Generate Wizard" ,route:"/art_wizard" },
        { imgUrl: upload, id: 3, name: "NFT Upload",route:"/upload_nft" },
        { imgUrl: whitelist, id: 4, name: "Whitelist",route:"/whitelist_projects" },
      ],
      accordion: "PROJECT NAME 1: SOLANA",
    },
    {
      accordion_id: 2,
      accordion_trigger: false,
      tab_id: 1,
      imgArr: [
        { imgUrl: carbon_folder, id: 1, name: "1st" },
        { imgUrl: upload, id: 2, name: "2nd" },
       
      ],
      accordion: "PROJECT NAME 2: SOLANA",
    },
  ],
};

export const MY_WHITELIST_CONTENT = {
  accordionToggleDown: AccordionToggleDown,
  accordionToggleUp: AccordionToggleUp,
  faqIcon: FAQ,
  accordion: [
    {
      accordion_id: 1,
      accordion_trigger: true,
      tab_id: 1,
      modal_icon: mdl,
      imgArr: [
        { imgUrl: upload, id: 1, name: "Upload CSV/Excel" },
        { imgUrl: "whitelist", id: 2, name: "Details About Format of whitelist file" },
      ],
      accordion: "PROJECT NAME 1: SOLANA",
    },
    {
      accordion_id: 2,
      accordion_trigger: false,
      tab_id: 1,
      imgArr: [
        { imgUrl: carbon_folder, id: 1, name: "1st" },
        { imgUrl: upload, id: 2, name: "2nd" },
        // { imgUrl: whitelist, id: 3, name: "3rd" },
        // { imgUrl: wizard, id: 4, name: "4th" },
      ],
      accordion: "PROJECT NAME 2: SOLANA",
    },
  ],
};

export const HEADER_MENU = {
  logoIcon: Icon,
  menu: [{ name: "Home", id: 1, active: false, header_id: "headerflex", scroll: true },
  { name: "Why Crayon", id: 2, active: false, header_id: "text-center-benefit", scroll: true },
  { name: "Pricing", id: 3, active: false, header_id: "pricecontent", scroll: true },
  { name: "Projects", id: 4, active: false, header_id: "text-center-launches", scroll: true },
  { name: "FAQs", id: 5, active: false, header_id: "faq", scroll: true },
  { name: "Contact", id: 6, active: false, header_id: "footer", scroll: true },
  { name: "Start Minting", id: 7, active: true, header_id: "", scroll: false }]
}




export const HERO_CONTENT = {
  heroIcon: hero,
  lineIcon: lineicon,
  foot: "NFTs",
  contentHead: "First fully automated multi-chain NFT launcher platform",
  contentFoot: "We launch your NFT concept to deployment, backed by our community of holder’s who earn 50% of earnings.",
  button_text: ["Get started for FREE", "Sell NFT"]
}


export const LAUNCHES = {
  MAIN_TITLE: `UPCOMING LAUNCHES`,
  COLOR: "#06132D",
  SUBTITLE: "Our Platform Empowers Creators, Games & Projects for Success",
  card: [
    { name: "Baby Dino Kingz #1643", id: 1, imgurl: l1, f1: "5555Supply", f2: "5 Mar" },
    { name: "Baby Dino Kingz #1643", id: 2, imgurl: l2, f1: "5555Supply", f2: "5 Mar" },
    { name: "Baby Dino Kingz #1643", id: 3, imgurl: l3, f1: "5555Supply", f2: "5 Mar" },
    { name: "Baby Dino Kingz #1643", id: 4, imgurl: l4, f1: "5555Supply", f2: "5 Mar" },
    { name: "Baby Dino Kingz #1643", id: 5, imgurl: l5, f1: "5555Supply", f2: "5 Mar" },
    { name: "Baby Dino Kingz #1643", id: 6, imgurl: l1, f1: "5555Supply", f2: "5 Mar" },
    { name: "Baby Dino Kingz #1643", id: 7, imgurl: l2, f1: "5555Supply", f2: "5 Mar" },
    { name: "Baby Dino Kingz #1643", id: 8, imgurl: l3, f1: "5555Supply", f2: "5 Mar" },
    { name: "Baby Dino Kingz #1643", id: 9, imgurl: l4, f1: "5555Supply", f2: "5 Mar" },
    { name: "Baby Dino Kingz #1643", id: 10, imgurl: l5, f1: "5555Supply", f2: "5 Mar" },
    { name: "Baby Dino Kingz #1643", id: 11, imgurl: l1, f1: "5555Supply", f2: "5 Mar" },
    { name: "Baby Dino Kingz #1643", id: 12, imgurl: l2, f1: "5555Supply", f2: "5 Mar" },
    { name: "Baby Dino Kingz #1643", id: 13, imgurl: l3, f1: "5555Supply", f2: "5 Mar" },
    { name: "Baby Dino Kingz #1643", id: 14, imgurl: l4, f1: "5555Supply", f2: "5 Mar" },
    { name: "Baby Dino Kingz #1643", id: 15, imgurl: l5, f1: "5555Supply", f2: "5 Mar" },
  ]
}

export const PAST_LAUNCHES = {
  MAIN_TITLE: `PAST LAUNCHES`,
  COLOR: "#091C43",
  SUBTITLE: "Our Platform Empowers Creators, Games & Projects for Success",
  card: [
    { name: "Baby Dino Kingz #1643", id: 1, imgurl: l1, f1: "5555Supply", f2: "5 Mar" },
    { name: "Baby Dino Kingz #1643", id: 2, imgurl: l2, f1: "5555Supply", f2: "5 Mar" },
    { name: "Baby Dino Kingz #1643", id: 3, imgurl: l3, f1: "5555Supply", f2: "5 Mar" },
    { name: "Baby Dino Kingz #1643", id: 4, imgurl: l4, f1: "5555Supply", f2: "5 Mar" },
    { name: "Baby Dino Kingz #1643", id: 5, imgurl: l5, f1: "5555Supply", f2: "5 Mar" },
    { name: "Baby Dino Kingz #1643", id: 6, imgurl: l1, f1: "5555Supply", f2: "5 Mar" },
    { name: "Baby Dino Kingz #1643", id: 7, imgurl: l2, f1: "5555Supply", f2: "5 Mar" },
    { name: "Baby Dino Kingz #1643", id: 8, imgurl: l3, f1: "5555Supply", f2: "5 Mar" },
    { name: "Baby Dino Kingz #1643", id: 9, imgurl: l4, f1: "5555Supply", f2: "5 Mar" },
    { name: "Baby Dino Kingz #1643", id: 10, imgurl: l5, f1: "5555Supply", f2: "5 Mar" },
    { name: "Baby Dino Kingz #1643", id: 11, imgurl: l1, f1: "5555Supply", f2: "5 Mar" },
    { name: "Baby Dino Kingz #1643", id: 12, imgurl: l2, f1: "5555Supply", f2: "5 Mar" },
    { name: "Baby Dino Kingz #1643", id: 13, imgurl: l3, f1: "5555Supply", f2: "5 Mar" },
    { name: "Baby Dino Kingz #1643", id: 14, imgurl: l4, f1: "5555Supply", f2: "5 Mar" },
    { name: "Baby Dino Kingz #1643", id: 15, imgurl: l5, f1: "5555Supply", f2: "5 Mar" },
  ]
}

export const BENEFITS = {
  MAIN_TITLE: `UPCOMING LAUNCHES`,
  SUBTITLE: "Our Platform Empowers Creators, Games & Projects for Success",
  card: [
    { name: "Art Generator", imgURL: g1, sub: "Advanced Art Generator Tool - Layers, Rule Engine + more.", color: "#17245C" },
    { name: "Custom Smart Contract", imgURL: g2, sub: "Whitelist with tokens, presales, and more.", color: "#1B3766" },
    { name: "Rarity Rankings", imgURL: g3, sub: "Fine Tuned Rarity Display - Included Instantly after Minting.", color: "#17245C" },
    { name: "Multi Chain launcher", imgURL: g4, sub: "Multiple blockchain supported", color: "#1B3766" },
    { name: "NFT Sales Bot", imgURL: g5, sub: "Discord and Twitter bots for NFT sales", color: "#17245C" },
    { name: "Whitelist Registration", imgURL: g6, sub: "crypto wallet address pre-approved for minting", color: "#1B3766" },
    { name: "Custom Mint List", imgURL: g7, sub: "Discord Bots to Verify Your Holders - Making DAOs Easy", color: "#17245C" },
    { name: "24/7 Support", imgURL: g8, sub: "24/7 Support  - get help and find answers to questions as soon as they come up", color: "#1B3766" }
  ]
}

export const COUNT = {
  MAIN_TITLE: "We're always building new & innovative features for you & your community - your NFT project will grow with us.",
  card: [
    { name: "NFTs Minted", "count": 326245 },
    { name: "Projects Powered", count: 326245 },
    { name: "Sol Processed & Tracked", count: 326245 },
    { name: "Security Breaches", count: 326245 }
  ]
}

export const PRICE_CONTENT = {
  MAIN_TITLE: "Our Pricing",
  RADIO: ['NFT Holder', 'Non NFT Holder'],
  card: [
    { name: "Primary Sales", count: "12%", sub: "Revenue Share", subcontent: "Trustless coded into smart contract" },


  ]
}

export const FOOTER = {
  MAIN_TITLE: "Get in Touch",
  sideImage: SIDE,
  card: [
    { name: "contact@crayonlabs.art", imgurl: p1 },
    { name: "crayonlabs", imgurl: p2 },
    { name: "@crayonlabsNFT", imgurl: p3 }
  ]

}

export const SUPPORT_FOOTER = {
  card: [
    { name: "contact@crayonlabs.art", imgurl: p1 },
    { name: "crayonlabs", imgurl: p2 },
    { name: "@crayonlabsNFT", imgurl: p3 }
  ]

}

export const LOGINDATA = {
  BG: BG
}


export const FAQ_CONTENT = {
  title: "Frequently asked questions",
  tabs: [
    { id: 1, name: "General" },
    { id: 2, name: "About NFT" },
    { id: 3, name: "About Crayon" }
  ],
  accordionToggleDown: AccordionToggleDown,
  accordionToggleUp: AccordionToggleUp,
  faqIcon: FAQ,
  questions: [
    { accordion_id: 1, accordion_trigger: false, tab_id: 1, question: "How can you ensure distribution of mints is random?", answer: "We will be using a smart contract deployed on the different chain to distribute your NFTs. The tokens can be verified on the blockchain and our smart contract code can be audited by the different chain core devs." },
    { accordion_id: 2, accordion_trigger: false, tab_id: 1, question: "What cryptocurrencies do you support minting for?", answer: "We focus solely on Ethereum, polygon, avalancheavax, solana and near blockchain." },
    { accordion_id: 3, accordion_trigger: false, tab_id: 1, question: "What am I getting for the revenue share fee?", answer: "Crayon labs is not just providing development work. Of course, that component is on us & we offer full service support from the frontend website - to mint & smart contract & more. But we are equally invested in projects we take on, and put our marketing & relationships behind them - from introductions to marketplaces, influencers, & more - to signal boosting & collaborations with our own network.Partnering with crayon labs is a decision to give your project the best chance of success in the NFT world." },
    { accordion_id: 4, accordion_trigger: false, tab_id: 1, question: "Is your fee negotiable?", answer: "We quote a baseline 20% revenue share model in our website, but are willing to discuss with projects on a case-by-case basis. A lot of consideration is given to the economics of the mint, etc.We do not choose to take on every project due to our time limitations." },
    { accordion_id: 5, accordion_trigger: false, tab_id: 2, question: "What is an NFT?", answer: "Non-Fungible Tokens are unique, easily verifiable digital assets that can represent items such as GIFs, images, videos, music albums, and more. Anything that exists online can be purchased as an NFT, theoretically.NFTs are different from cryptocurrencies because they’re not interchangeable. Think of Pokémon cards: You can trade them, but a Gastly is not the same as a holographic Charizard. But a bitcoin is indistinguishable from another bitcoin.The other reason is because you think it’s valuable...and will only increase in value. And yes, you can make money off of an NFT by buying and reselling it for more." },
    { accordion_id: 6, accordion_trigger: false, tab_id: 2, question: "Why would I want to own an NFT? Can I make money on it?", answer: "One reason to buy an NFT is for its emotional value, which isn’t so different from physical objects...unless you’re a total utilitarian. No one buys lip gloss because they need it. They buy it for the way it makes them feel. The same can be true for a GIF, image, video, or other digital asset." },
    { accordion_id: 7, accordion_trigger: false, tab_id: 2, question: "How do you know your NFT is authentic?", answer: "NFT ownership is recorded on the blockchain, and that entry acts as a digital pink slip. Our NFTs will be encoded using Metaplex's smart contract on the Solana Blockchain." },
    { accordion_id: 8, accordion_trigger: false, tab_id: 2, question: "Which wallets will I be able to use to mint an NFT?", answer: "We offer a number of wallet connections for minting." },
    { accordion_id: 9, accordion_trigger: false, tab_id: 3, question: "What is the Solana Foundation?", answer: "The Solana Foundation is dedicated to growing the Solana network into the world’s most decentralized and censorship-resistant blockchain. The Foundation continues to invest significant resources in figuring out how to meet these objectives both now and in the future" },
    { accordion_id: 10, accordion_trigger: false, tab_id: 3, question: "What is Ethereum protocol?", answer: "The Solana Foundation is dedicated to growing the Solana network into the world’s most decentralized and censorship-resistant blockchain. The Foundation continues to invest significant resources in figuring out how to meet these objectives both now and in the future" },
    { accordion_id: 11, accordion_trigger: false, tab_id: 3, question: "What is Polygon?", answer: "Polygon (MATIC) is an Ethereum protocol that aims “to create, issue, and manage digital securities on the blockchain.” By creating a compliance-focused standard (ST-20) to issue and manage security tokens, Polymath seeks to “tokenize and trade traditional and new classes of assets" },
    { accordion_id: 12, accordion_trigger: false, tab_id: 3, question: "What is Near protocol?", answer: "NEAR Protocol is a software that aims to incentivize a network of computers to operate a platform for developers to create and launch decentralized applications." },
    { accordion_id: 13, accordion_trigger: false, tab_id: 3, question: "What is Avalanche AVAX protocol?", answer: "Avalanche is a decentralized, open-source blockchain with smart contract functionality. AVAX is the native cryptocurrency of the platform." },
  ]
}



export const SIGNUPFORM = {
  toptitle: "Already have an account?",
  subtitle: "Sign in ?",
  innertitle: "Sign up",
  mint: "Create account and start minting",
  input: [
    { startTyping: false, placeholder: "Enter your email", className: "signupinput", name: "Email Address", value: "", valid: false, errorMessage: "Enter correct Email ID", regex: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/, showIcon: false, place: "Enter your Email" },
    { startTyping: false, placeholder: "Enter password", className: "signupinput", name: "Set Password", value: "", valid: false, errorMessage: "Password should be minimum 6 letters and should contain one special character", regex: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/, showIcon: false, place: "Enter Password" },

  ],
  buttoname: "Sign Up"
}

export const LOGINFORM = {
  toptitle: "Sign in",
  subtitle: "Hi Welcome Back!",
  innertitle: "Create new Account?",
  mint: "Sign up",
  input: [
    { startTyping: false, className: "signupinput", placeholder: "Enter your email", name: "Email Address", value: "", valid: false, errorMessage: "Enter correct Email ID", regex: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/, showIcon: false, place: "Enter your Email" },
    { startTyping: false, className: "signupinput", placeholder: "Enter password", name: "Password", value: "", valid: false, errorMessage: "Password should be minimum 6 letters and should contain one special character", regex: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/, showIcon: false, place: "Enter Password" },

  ],
  buttoname: "Sign in"
}

export const FORGOT = {
  TITLE: "Forgot Password",
  SUBTITLE: "Enter your registered email below to receive password reset instruction",
  input: [
    { className: "signupinput", placeholder: "Enter your email", name: "Email Address", value: "", valid: false, errorMessage: "Enter your Email ID", regex: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/, showIcon: false, place: "Enter your Email" },

  ],
  goback: "Goto Sign in page",
  buttoname: "Send Email"
}

export const RESET_PWD = {
  TITLE: "Create new Password",
  SUBTITLE: "Enter your registered email below to receive password reset instruction",
  input: [
    { className: "signupinput", name: "New Password", value: "", valid: false, errorMessage: "Enter new password", regex: '', showIcon: false, place: "Enter new password" },
    { className: "signupinput", name: "Confirm Password", value: "", valid: false, errorMessage: "Confirm password", regex: '', showIcon: false, place: "confirm password" },


  ],
  goback: "Goto Sign in page",
  buttoname: "Reset Password"
}


export const EMAIL_VERIFY = {
  TITLE: "Check your email",
  SUBTITLE: "we have sent password reset link and instructions to your email below",
  buttoname: "Next",
  goback: "Goto Sign in page",
}

export const EMAIL_SENT = {
  TITLE: "Check your email", 
  SUBTITLE: "we have sent a password recovery instruction to your email below",
  goback: "Go to Sign in page",
  icon :sent_mail,
}

export const ART_WIZARD_FINAL = {
  ImgSrc: cap, 
  Scroe: "2677 / 10000",
  Contract: "05646541s56a4d564a......",
  content : "1 Avashark Costs 1 Avax",
  button : "SALE IS NOT ACTIVE",
  plus : plus,
  minus : minus,

}

export const ART_WIZARD_MAIN = {
  ImgSrc: add_wiz_icon, 
  content : "Add new attribute image",
  button : "Add None / Blank",
  plus : plus,
  minus : minus,
  button_layer : "Create new layer",
  button_layer_icon : button_layer_icon,
  button_bottom : "Generate Collection",
  button_bottom_icon : Generate_collection,
  delete_button_icon : delete_button_icon,


}

export const CREATE_PASSWORD = {
  TITLE: "Create new password", 
  SUBTITLE: "we have sent a password recovery instruction to your email below",
  button_text: "Create",
  icon :sent_mail,
}


export const dashboardcards = {
  data: [
    { title: "My Projects", imgIcon: my_projects_circle, subtitle: "Let's start by giving your project a name", className: "cardboard_all", route: "/my_projects" },
    { title: "Generate Wizard", imgIcon: wizard_circle, subtitle: " You can generate up to roughly ~50 unique combinations", className: "cardboard_all",route: "/art_wizard_home" },
    { title: "NFT Upload", imgIcon: upload_circle, subtitle: "Manually upload an NFT", className: "cardboard_all",route: "/nft_home" },
    { title: "Whitelist", imgIcon: whitelist_circle, subtitle: " Your whitelist registry", className: "cardboard_all",route: "/whitelist_projects" },
    { title: "Minting  Site", imgIcon: minting_circle, subtitle: "Your mint settings", className: "cardboard_all",route: "/#" },
    { title: "Support", imgIcon: support_circle, subtitle: "Connect with us", className: "cardboard_all",route: "/support" },

  ]
}

export const ProjectsContent = {
  name: "Looks Like you haven’t created any project",
  btn_sub: "Click the below button to get started",
  no_project_btn_name: "create project",
  rec: "rec"

}


export const drops=[
  {value: "Solana", label:"Solana", id: 1 ,imgurl:solana},
  {  value: "Etherum",label:"Etherum",  id: 2 ,imgurl:eth},
  { value: "Avalanche", label:"Avalanche", id: 3 ,imgurl:avalanche},
  {  value: "Polygon",value:"Polygon", label:"Polygon", id: 4 ,imgurl:poly},
  {value: "Near", label:"Near", id: 5,imgurl:near },
  {value: "Phantom", label:"Phantom", id: 6,imgurl:Fantom },
  {value: "Binance Smart Chain", label:"Binance Smart Chain", id: 7,imgurl:Binance },
  

];

export const Projectcreationutils = {
  input: [{
    name: "BlockChain", type: "dropdown",
    disabled: true,
    expandtoggle: false,
    data: [
      {value: "Solana", label:"Solana", id: 1 },
      {  value: "Etherum",label:"Etherum",  id: 2 },
      { value: "Avalanche", label:"Avalanche", id: 3 },
      {  value: "Polygon",value:"Polygon", label:"", id: 4 },
      {value: "Near", label:"Near", id: 5 }

    ],
    value: ""
  },
  { name: "Project Name", type: "text", value: "", data: [], disabled: false },
  { name: "Symbol", type: "text", value: "", data: [], disabled: false },
  { name: "Total Supply", type: "text", value: "", data: [], disabled: false },
  { name: "Mint Price", type: "text", value: "", data: [], disabled: false },
  { name: "Mint Per Wallet", type: "text", value: "", data: [], disabled: false },
  { name: "Launch Date", type: "date", value: "", data: [], disabled: false },
  { name: "External URL", type: "date", value: "", data: [], disabled: false }
  ]
}


export const ACCORDION = {
  DATA: [
    {
      title: "Mint Fund", toggle: false,
      inputs: [
        { name: "Address", value: "", mandatory: true, showTooltip: true, toolins: "" },
        { name: "Percentage", mandatory: true, value: "", showTooltip: true, toolins: "" }
      ]
    },
    {
      title: "Whitelist/Pre-sale", toggle: false,
      inputs: [
        { name: "Discount Price", value: "", mandatory: true, showTooltip: true, toolins: "" },
        { name: "Pre-sale Launch Date", mandatory: true, value: "", showTooltip: true, toolins: "" }
      ]
    },
    {
      title: "Royality", toggle: false,
      inputs: [
        { name: "Royalty Percentage", value: "", mandatory: true, showTooltip: true, toolins: "" },
        { name: "Address", mandatory: true, value: "", showTooltip: true, toolins: "" },
        { name: "Royalty Share", mandatory: true, value: "", showTooltip: true, toolins: "" }
      ]
    }
  ]
}

export const blockchaindata = {
  input2: [{ name: "Binance", imgurl: Binance }, { name: "Fantom", imgurl: Fantom }],
  input1: [{ name: 'Solana', imgurl: solana }, { name: "Avalanche", imgurl: avalanche }, { name: "Near", imgurl: near }, { name: "Etherum", imgurl: eth }, { name: "Polygon", imgurl: poly }]
}
export const blockchaindata2 = {

  input1: [{ name: 'Solana', imgurl: solana }, { name: "Near", imgurl: near }, { name: "Binance", imgurl: Binance }, { name: "Fantom", imgurl: Fantom }, { name: "Etherum", imgurl: eth }, { name: "Polygon", imgurl: poly }, { name: "Avalanche", imgurl: avalanche }]
}

export const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 6
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 5
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 4  
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};

export const responsive2 = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 6
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 3
  }
};
export const responsive3 = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 6
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 2
  }
};
export const responsive4 = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 6
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 2
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 2
  }
};



export const DIALOG_RESPONSIVE_BREAK_FOR_DELETE_PRO = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    width: '40%',
    height:"60%",
    bottom: 'auto',
    marginRight: '-50%',
    borderRadius:"20px",
    zIndex:5,
    transform: 'translate(-50%, -50%)',
  },
}

export const DIALOG_RESPONSIVE_BREAK_FOR_UPLOAD_NFT = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    width: '80%',
    height:"90%",
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    borderRadius:"20px",
    zIndex:5
  },
}

export const DIALOG_RESPONSIVE_CREATE_RULE = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    width: '60%',
    height:"90%",
    bottom: 'auto',
    borderRadius:"20px",
    zIndex:5,
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
}

export const DIALOG_RESPONSIVE_DRAG = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    width: '60%',
    height:"70%",
    zIndex:5,
    borderRadius:"20px",
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
}
export const DIALOG_RESPONSIVE_CONFIRM = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    width: '30%',
    height:"18%",
    borderRadius:"20px",
    zIndex:5,
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
}
export const FORM_ACCORDION = {
  DATA: [
    {
      accordion_id: 1, accordion_trigger: false,
      split: true,
      title: "Mint Fund",
      componentName: 'MintFund'

    },
    {
      accordion_id: 2, accordion_trigger: false,
      split: true,
      title: "Whitelist/pre-sale",
      componentName: "WhiteList"

    },

    {
      accordion_id: 3, accordion_trigger: false,
      split: true,
      title: "Royality",
      componentName: "Royality"

    },


  ]
}

export const DIALOG_CONTENT_CONFIRM_WHITELITS={
  title:"CONFIRM",
  SUBCONTENT:"Are you sure you want to delete whitelists?",
  BUTTON_TITLE:"Delete"
}


export const BREAD_CRUMD_DATA={
  DASHBOARD:[
    // {name:"Logout",route:"/login"},
    {name:"Dashboard",route:"/dashboard"}
],
PROJECTS:[
  // {name:"Logout",route:"/login"},
  {name:"Dashboard",route:"/dashboard"},
  {name:" > ",route:""},
  {name:"My Projects",route:"/my_projects"}
],
PROJECTS_CREATE:[
  // {name:"Logout",route:"/login"},
  {name:"Dashboard",route:"/dashboard"},
  {name:" > ",route:""},
  {name:"Create Project",route:"/create_project"}
]
,WIZARD:[
  // {name:"Logout",route:"/login"},
  {name:"Dashboard",route:"/dashboard"},
  {name:" > ",route:""},
  {name:"Generate Wizard",route:null}
]
,NFT:[
  // {name:"Logout",route:"/login"},
  {name:"Dashboard",route:"/dashboard"},
  {name:" > ",route:""},
  {name:" NFT Upload ",route:null},
  {name:" > ",route:""},
  {name:"Custom NFT"}
],
NFT_UPLOAD:[
  {name:"Dashboard",route:"/dashboard"},
  {name:" > ",route:""},
  {name:"My Projects",route:"/my_projects"},
  {name:" > ",route:""},
  {name:" NFT Upload ",route:null}
]
,WHITELISTS:[
  // {name:"Logout",route:"/login"},
  {name:"Dashboard",route:"/dashboard"},
  {name:" > ",route:""},
  {name:"White lists ",route:"/whitelist_projects"}
],

NFTHOME:[
  // {name:"Logout",route:"/login"},
  {name:"Dashboard",route:"/dashboard"},
  {name:" > ",route:""},
  {name:"My Projects",route:"/my_projects"},
  {name:" > ",route:""},
  {name:"NFT Upload",route:null},
]



,SUPPORT:[
  // {name:"Logout",route:"/login"},
  {name:"Dashboard",route:"/dashboard"},
  {name:" > ",route:""},
  {name:"Support",route:"/support"}
]
,UPDATE:[
  // {name:"Logout",route:"/login"},
  {name:"Dashboard",route:"/dashboard"},
  {name:" > ",route:""},
  {name:"Project Details",route:null}
]
}


export const CREATE_PROJECT_DATA=[
  {input:['Block Chain','External Url'],label:['blockchain','external_url'],drop:true},
  {input:['Project Name'],drop:false,label:['project_name']},
  {input:['Symbol'],drop:false,label:['symbol']},
  {input:['Total Supply','Mint Price'],drop:false,label:['total_supply','mint_price']},
  {input:['Mint Per Wallet','Launch Date'],drop:false,label:['max_mint_limit','launch_date']},
]


export const ART_LAYER_UTILS= {
  LAYER_JSON:[
   ]
  
  
}