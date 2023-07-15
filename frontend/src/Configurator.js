import { Logo } from '@pmndrs/branding'
import { Wizard, useWizard } from 'react-use-wizard';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import React, { useState, useRef } from "react";
import { Slider } from "primereact/slider";
import { Checkbox } from 'primereact/checkbox';
import { InputText } from "primereact/inputtext";
import { Toast } from 'primereact/toast';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { motion } from 'framer-motion'
import { AiOutlineArrowLeft, AiOutlineEye, AiOutlineHighlight, AiOutlineLogin, AiOutlineQuestionCircle, AiOutlineSend } from 'react-icons/ai'
import { useSnapshot } from 'valtio'
import { Modal } from "react-bootstrap";
import { state } from './store'

const Intro = () => {
	const transition = { type: 'spring', duration: 0.8 }
	const config = {
		initial: { x: -100, opacity: 0, transition: { ...transition, delay: 0.5 } },
		animate: { x: 0, opacity: 1, transition: { ...transition, delay: 0 } },
		exit: { x: -100, opacity: 0, transition: { ...transition, delay: 0 } }
	}
	const snap = useSnapshot(state)
	const { nextStep } = useWizard();

	const customize = () => {
		state.name = null;
		state.email = null;
		state.device = null;
		state.agreed = false;
		nextStep();
	}

	return (
		<>	
               <div style={{ position: 'absolute', top: 0, left: 0, width: '50%', height: '100%', display: 'flex', flexDirection: 'column' }}>
					<motion.header initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0 }} transition={transition}>
							<img src='logo.png' width="80" height="80" alt="logo" />
							<motion.div animate={{ x: snap.intro ? 0 : 100, opacity: snap.intro ? 1 : 0 }} transition={transition}>
									<Logo width="40" height="40" />
							</motion.div>
					</motion.header>

					<motion.section key="intro" {...config}>
						<div className="section--container" >
							<motion.div
								key="title"
								initial={{ x: 100, opacity: 0 }}
								animate={{ x: 0, opacity: 1 }}
								transition={{ type: 'spring', damping: 5, stiffness: 40, restDelta: 0.001, duration: 0.3 }}>
								<h2>e-Nable Italia Device Configurator</h2>
							</motion.div>
							<motion.div
								key="p"
								initial={{ y: 100, opacity: 0 }}
								animate={{ y: 0, opacity: 1 }}
								transition={{
									type: 'spring',
									damping: 7,
									stiffness: 30,
									restDelta: 0.001,
									duration: 0.6,
									delay: 0.2,
									delayChildren: 0.2
								}}>
								<p>
									Create your unique Device with our brand-new 3D customization tool.<br/>
									<strong>Customize</strong> on your needs to fit with recipient characteristics and generate the corresponding STL file.
								</p>
								<button onClick={() => customize()}>
									CUSTOMIZE IT <AiOutlineHighlight size="1.3em" />
								</button>
							</motion.div>
						</div>
					</motion.section>
				</div>
	  </>
	);
};

const DialogForm = () => {
	const transition = { type: 'spring', duration: 0.8 }
	const snap = useSnapshot(state)
	const toast = useRef(null);

	const {
		nextStep,
		previousStep
	  } = useWizard();
	  
	const config = {
		initial: { x: -100, opacity: 0, transition: { ...transition, delay: 0.5 } },
		animate: { x: 0, opacity: 1, transition: { ...transition, delay: 0 } },
		exit: { x: -100, opacity: 0, transition: { ...transition, delay: 0 } }
	}
	const [showMe, setShowMe] = useState(false);

	const onClick = () => {
		if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(state.email)) {
			toast.current.show({severity:'error', summary: 'Invalid email', detail:'Invalid email address. E.g. example@email.com', life: 5000});
		  	return;
		}
		if (!state.agreed)  {
			toast.current.show({severity:'error', summary: 'Privacy consent', detail:'No privacy consent provided, we are sorry, it is not possible to proceed without the consent.', life: 5000});
		  	return;
		}
		if (!state.device) {
			toast.current.show({severity:'error', summary: 'Device selection', detail:'Please select a device model to customize.', life: 5000});
		  	return;
		}

		setShowMe(true);
    }

    const onHide = (name) => {
        setShowMe(false);
		if (name == 'yes')
			nextStep();
		else {
			state.name = null;
			state.email = null;
			state.device = null;
			state.agreed = false;
			previousStep();
		}
    }

    const renderFooter = () => {
        return (
            <div>
                <Button label="No" icon="pi pi-times" onClick={() => onHide('no')} className="p-button-text" />
                <Button label="Yes" icon="pi pi-check" onClick={() => onHide('yes')} autoFocus />
            </div>
        );
    }

    return (
		<>	
		<div style={{ position: 'absolute', top: 0, left: 0, width: '50%', height: '100%', display: 'flex', flexDirection: 'column' }}>
			 <motion.header initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0 }} transition={transition}>
					 <img src='logo.png' width="80" height="80" alt="logo" />
					 <motion.div animate={{ x: snap.intro ? 0 : 100, opacity: snap.intro ? 1 : 0 }} transition={transition}>
							 <Logo width="40" height="40" />
					 </motion.div>
			 </motion.header>

			 <motion.section key="form" {...config}>
				 <div className="section--container" >
					 <motion.div
						 key="title"
						 initial={{ x: 100, opacity: 0 }}
						 animate={{ x: 0, opacity: 1 }}
						 transition={{ type: 'spring', damping: 5, stiffness: 40, restDelta: 0.001, duration: 0.3 }}>
						<Toast ref={toast} />							
						<p>Before to proceed with customization you are requested to provide some information about you, the information provided will be used to understand the type of user of the application</p>
						<div className="field grid">
							<label for="name" class="col-fixed" style={{ "width": "300px" }}>Name</label>
							<div class="col">
								<InputText id="name" value={snap.name} onChange={(e) => (state.name = e.target.value)} className="w-full" tooltip='Enter your name and surname'/>
							</div>
						</div>
						<div className="field grid">
							<label for="email" class="col-fixed" style={{ "width": "300px" }}>E-mail</label>
							<div class="col">
								<InputText id="email" value={snap.email} onChange={(e) => (state.email = e.target.value)} className="w-full" tooltip='Enter your email'/>
							</div>							
						</div>
						<div className="field grid">
							<label class="col-fixed" style={{ "width": "300px" }}>Device</label>
							<div class="col">
								<Dropdown value={snap.device} onChange={(e) => (state.device = e.value)} options={snap.deviceItems} optionLabel="name" placeholder="Select a Device" className="w-full md:w-14rem" tooltip='Select the device to customize'/>
							</div>							
						</div>
						<div className="field grid">
							<div class="col">
								<Checkbox onChange={(e) => (state.maker = e.checked)} checked={snap.maker}></Checkbox>
								<label class="col-fixed" style={{ "width": "300px" }}>I am a Maker</label>
							</div>
						</div>
						<div className="field grid">
							<div class="col">
								<Checkbox onChange={(e) => (state.researcher = e.checked)} checked={snap.researcher}></Checkbox>
								<label class="col-fixed" style={{ "width": "300px" }}>I am a Student/Researcher</label>
							</div>
						</div>
						<div className="field grid">
							<label class="col-fixed" style={{ "width": "300px" }}>Privacy disclaimer:</label>
						</div>
						<div className="field grid">
							<div class="col">
								<Checkbox onChange={(e) => (state.agreed = e.checked)} checked={snap.agreed}></Checkbox>
								<label class="col-fixed" style={{ "width": "300px" }}>I consent to the processing of provided personal data</label>
								<p style={{fontSize : 12}}>I declare pursuant to ex art 13 of EU Regulation 2016/679 that I have read the privacy policy (<b>you can read the full privacy policy at this <a href='https://e-nableitalia.it/en/privacy-policy-2/'>link</a></b>) and that I am informed on the purposes and methods of treatment for which the data are intended, the subjects to whom they may be communicated, also as persons in charge, as well as the right of access to personal data provided with the right to request its updating, rectification, integration and cancellation. For the above, by sending my request, I express my consent to the processing of my personal data in the manner and for the purposes strictly connected and instrumental to the management of the request for an e-Nable device customization and I expressly consent to the transmission of data in it contents.
								</p>								
							</div>							
						</div>
					 </motion.div>
					 <motion.div
						 key="p"
						 initial={{ y: 100, opacity: 0 }}
						 animate={{ y: 0, opacity: 1 }}
						 transition={{
							 type: 'spring',
							 damping: 7,
							 stiffness: 30,
							 restDelta: 0.001,
							 duration: 0.6,
							 delay: 0.2,
							 delayChildren: 0.2
						 }}>
							<div className="field grid">
								<button className='preview' onClick={() => onHide('no')}>
									Go Back
									<AiOutlineArrowLeft size="1.3em" />
								</button>
								<button className='preview' onClick={() => onClick()}>
									Continue
									<AiOutlineLogin size="1.3em" />
								</button>
							</div>
							<Dialog header="Disclaimer" visible={showMe} style={{ width: '50vw' }} footer={renderFooter()} onHide={() => onHide('no')}>
								<p>By choosing "yes" in this dialog you consent the transmission of the provided information.</p>
							</Dialog>
					 </motion.div>
				 </div>
			 </motion.section>
		 </div>
</>   
    )
}

function Customizer() {
	const transition = { type: 'spring', duration: 0.2 }
	const config = {
		initial: { x: -100, opacity: 0, transition: { ...transition, delay: 0.5 } },
		animate: { x: 0, opacity: 1, transition: { ...transition, delay: 0 } },
		exit: { x: -100, opacity: 0, transition: { ...transition, delay: 0 } }
	}
	const toast = useRef(null);
	const snap = useSnapshot(state);
	const {
		previousStep,
		goToStep
	  } = useWizard();

	function timeout(delay) {
		return new Promise( res => setTimeout(res, delay) );
	}

	const goback = () => {
		state.name = null;
		state.email = null;
		state.device = null;
		state.agreed = false;
		previousStep();
	}

	const handleClick = async () => {
		var count = 0;
		// validate params
		state.deviceParameters.forEach(function(v, key) {
			if (v.value < v.min) {
				toast.current.show({severity:'error', summary: 'Parameters validation failed', detail: 'Parameter[' + v.key + '] min value = ' + v.min, sticky: true});
			} else if (v.value > v.max) {
				toast.current.show({severity:'error', summary: 'Parameters validation failed', detail: 'Parameter[' + v.key + '] max value = ' + v.max, sticky: true});
			} else
				count ++;
		})

		if (count != state.deviceParameters.length)
			return;

		try {
			toast.current.show({severity:'info', summary: 'Parameters validated, generating device', detail:'Please wait until complete...', life: 5000});
		  	const response = await fetch('https://dev.e-nableitalia.it/backend/customizer/generate', {
			method: 'POST',
			body: JSON.stringify({ 
				username: state.name,
				email: state.email,
				device: state.device.name,
				deviceUrl : state.device.deviceUrl,
				parameters: state.deviceParameters
			}),
			headers: {
			   'Content-type': 'application/json; charset=UTF-8',
			},
		});
			
	
		if (!response.ok) {
			toast.current.show({severity:'error', summary: 'Error generating device: ${response.status}', detail:'Error', life: 5000});
			return;
		}
	
		toast.current.show({severity:'info', summary: 'Device generation complete', detail:'Wait for generated STL file in your mailbox...', life: 3000});
		
		const result = await response.blob();
	
		// Create blob link to download
		const url = window.URL.createObjectURL(
			new Blob([result]),
		);
		const link = document.createElement('a');
		link.href = url;
		link.setAttribute(
			'download',
			snap.device + '.stl',
		);
	
		// Append to html link element page
		document.body.appendChild(link);
	
		// Start download
		link.click();
	
		// Clean up and remove the link
		link.parentNode.removeChild(link);
		
		console.log('result is: ', JSON.stringify(result, null, 4));
		} catch (err) {
			toast.current.show({severity:'error', summary: 'Error generating device', detail:'Error: ' + err, life: 5000});
		} finally {
			toast.current.show({severity:'info', summary: 'Done', detail:'Thanks for having used out device configurator.', life: 3000});
			await timeout(5000);
			goToStep(0);
		}	
	  };

	const handlechange = (v, key) => {
		var result = [...state.deviceParameters]; //<- copy parameters into result
		result = result.map((x) => { //<- use map on result to find element to update using id
		  if (x.key === key) {
			x.value = v;
		  } 
		  return x;
		});
	};

	const handlevalidate = (v, key) => {
		var result = [...state.deviceParameters]; //<- copy parameters into result
		result = result.map((x) => { //<- use map on result to find element to update using id
			if (x.key === key) {
				x.value = v;
				if (v < x.min)
					x.value = x.min;
				if (v > x.max)
					x.value = x.max;				
			} 
			return x;
		});
	};

	return (
		<div style={{ position: 'absolute', top: 0, left: 0, width: '50%', height: '100%', display: 'flex', flexDirection: 'column' }}>
		 	<motion.header initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0 }} transition={transition}>
					 <img src='logo.png' width="80" height="80" alt="logo" />
					 <motion.div animate={{ x: snap.intro ? 0 : 100, opacity: snap.intro ? 1 : 0 }} transition={transition}>
							 <Logo width="40" height="40" />
					 </motion.div>
			 </motion.header>
			 <motion.section key="form" {...config}>
				<motion.div
						 key="p"
						 initial={{ y: 100, opacity: 0 }}
						 animate={{ y: 0, opacity: 1 }}
						 transition={{
							 type: 'spring',
							 damping: 7,
							 stiffness: 30,
							 restDelta: 0.001,
							 duration: 0.6,
							 delay: 0.2,
							 delayChildren: 0.2
						 }}>
					<div className="customizer">
						<div className="section--container" >
							<Toast ref={toast} />				
							<div className="field grid">
								<label class="col-fixed" style={{ "width": "300px" }}>Device Color</label>
								<div class="col">
									<div id="color" className="color-options">
										{snap.colors.map((color) => (
											<div key={color} className={`circle`} style={{ background: color }} onClick={() => (state.color = color)}></div>
										))}
									</div>
								</div>
							</div>
							{snap.deviceParameters.map((parameter) => (
								<div className="field grid">
									<label class="col-fixed" style={{ "width": "300px" }}>{parameter.description}</label>
									<div class="col">
										<InputText value={parameter.value} onFocusOut={(e) => handlevalidate(e.target.value, parameter.key) } onChange={(e) => handlechange(e.target.value, parameter.key) } className="w-full" tooltip={ parameter.tooltip }/>
										<Slider id="arm" value={parameter.value} min={parameter.min} max={parameter.max} onChange={(e) => handlevalidate(e.value, parameter.key)} className="w-full" />
									</div>
								</div>
							))}
							
							<div className="field grid">
								<p style={{ fontSize : 14}}>Welcome {snap.name}, use the above controls to change parameters and to adapt device to recipient physical characteristics, once done click GENERATE to generate the custom STL file, file download will start automatically once STL generation process is completed. Click on the HELP button to get help on how to take measures for proper device dimensioning.</p>
							</div>
	
							<div className="field grid">
							<button className='preview' 
							style={{ background: snap.color }} onClick={() => goback()}>
								GO BACK
								<AiOutlineArrowLeft size="1.3em" />
							</button>

							<button className='preview' 
							style={{ background: snap.color }} onClick={() => (window.open('https://e-nableitalia.it/en/dimensionamento-bike-adapter/', '_blank', 'noreferrer'))}>
								Help
								<AiOutlineQuestionCircle size="1.3em" />
							</button>

							<button 
							style={{ background: snap.color }} onClick={() => alert("this project is still a work in progress, preview feature is in roadmap but it is not yet implemented, stay tuned for project updates.")}>
								Preview
								<AiOutlineEye size="1.3em" />
							</button>
						
							<button className='preview' 
								style={{ background: snap.color }}
								onClick={handleClick}>
								GENERATE
								<AiOutlineSend size="1.3em" />
							</button>
							</div>
						</div>
					</div>
				</motion.div>
			</motion.section>
		</div>
	)
}

export function Configurator() {
	return (
		<div>
			<Wizard>
				<Intro />
				<DialogForm />
				<Customizer />
			</Wizard>
		</div>
	)
}
