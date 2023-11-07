import axios from 'axios';
import { useRouter } from 'next/router';
import { useState } from 'react'
import Spinner from './Spinner';
import Swal from 'sweetalert2';

export default function ProjectForm({
    _id,
    projectID: existingProjectID,
    standar: existingStandar,
    vintage: existingVintage,
    volumen: existingVolumen,
    name: existingName,
    projectLink: existingProjectLink,
    tech: existingTech,
    corsia: existingCorsia,
    sdg: existingSdg,
    pais: existingPais,
    disponible: existingDisponible,
    notas: existingNotas,
    files: existingFiles,
}) {

    // creamos los usestate para manejar las variables y los inputs. (los estados pueden tomar el valor, del existente o vacio, en el caso de que toque edit)
    const [projectID, setProjectId] = useState(existingProjectID || '');
    const [standar, setStandar] = useState(existingStandar || '');
    const [vintage, setVintage] = useState(existingVintage || '');
    const [volumen, setVolumen] = useState(existingVolumen || '');
    const [name, setName] = useState(existingName || '');
    const [projectLink, setProjectLink] = useState(existingProjectLink || '');
    const [tech, setTech] = useState(existingTech || '');
    const [corsia, setCorsia] = useState(existingCorsia || '');
    const [sdg, setSdg] = useState(existingSdg || '');
    const [pais, setPais] = useState(existingPais || '');
    const [disponible, setDisponible] = useState(existingDisponible || '');
    const [notas, setNotas] = useState(existingNotas || '');
    const [files, setFiles] = useState(existingFiles || []);

    const [isUploading, setIsUploading] = useState(false);
    // handle errors 
    const [error, setError] = useState("");
    const router = useRouter();

    async function saveProject(e) {
        try {
            e.preventDefault();
            const data = { projectID, standar, vintage, volumen, name, projectLink, tech, corsia, sdg, pais, disponible, notas, files }

            if (!projectID || !standar || !vintage || !volumen || !tech || !pais || !name) {
                setError('Faltan datos importantes');
                return;
            }
            if (_id) {
                //update
                await axios.put('/api/projects', { ...data, _id });
            } else {
                //create
                const res = await axios.post('/api/projects', data);
            }

            router.push('/inventary');
        } catch (error) {
            console.log(error)
        }
    }

    // CONEXION CON API PARA SUBIR IMAGENES 
    async function uploadFiles(e) {
        e.preventDefault()
        const files = e.target?.files;
        if (files?.length > 0) {
            setIsUploading(true);
            const data = new FormData();
            for (const file of files) {
                data.append('file', file);
            }
            const res = await axios.post('/api/upload', data);
            setFiles(oldFiles => {
                return [...oldFiles, ...res.data.links];
            });
            setIsUploading(false);
        }
    }

    // solo saco la imagen del array images usando filter, y si el valor link es igual al del click, entonces seteo las imagenes, con la nueva lista
    function deleteFile(e, link) {
        e.preventDefault()
        try {
            Swal.fire({
                title: 'Estas seguro?',
                text: `Quiere borrar este archivo?`,
                showCancelButton: true,
                cancelButtonText: 'Cancelar',
                confirmButtonText: 'Si, borrar!',
                confirmButtonColor: '#d55',
                reverseButtons: true,
            }).then(async result => {
                // hacemos console log del result y vemos que opcion es cada una. 
                if (result.isConfirmed) {
                    const newOnesFiles = files.filter(value => value !== link)
                    setFiles(newOnesFiles)
                }
            });

        } catch (error) {
            console.log(error)
        }

    }


    return (
        <div >
            <form onSubmit={saveProject} className='flex grid gap-3 mb-3'>
                <label className='text-gray-400'>Project ID</label>
                <input
                    type='text'
                    placeholder='ej: 6877'
                    value={projectID}
                    onChange={e => setProjectId(e.target.value)} />
                <label className='text-gray-400'>STANDAR</label>
                <select
                    className=" border border-gray-200 py-2 px-6 bg-zinc-100/40"
                    value={standar}
                    onChange={e => setStandar(e.target.value)}>
                    <option value="">-no seleccionado-</option>
                    <option value="CDM">CDM</option>
                    <option value="VCS">VCS</option>
                    <option value="GS">GS</option>
                    <option value="CERCARBONO">CERCARBONO</option>
                    <option value="I-RECs">I-RECs</option>
                    <option value="CAR">CAR</option>
                    <option value="CSA">CSA</option>
                    <option value="PLAN VIVO">Plan Vivo</option>
                </select>
                <label className='text-gray-400'>Vintage</label>
                <input
                    type='text'
                    placeholder='ej: 2022'
                    value={vintage}
                    onChange={e => setVintage(e.target.value)} />
                <label className='text-gray-400'>Volume</label>
                <input
                    type='number'
                    placeholder='ej: 4512'
                    value={volumen}
                    onChange={e => setVolumen(e.target.value)} />
                <label className='text-gray-400'>Project's Name</label>
                <input
                    type='text'
                    placeholder='ej: piedra larga II'
                    value={name}
                    onChange={e => setName(e.target.value)} />
                <label className='text-gray-400'>Project's Link</label>
                <input
                    type='text'
                    placeholder='ej: https://cdm.unfccc.int/Projects/DB/AENOR1343375362.2/view'
                    value={projectLink}
                    onChange={e => setProjectLink(e.target.value)} />

                <label className='text-gray-400'>TECH</label>
                <select
                    className=" border border-gray-200 py-2 px-6 bg-zinc-100/40"
                    value={tech}
                    onChange={e => setTech(e.target.value)}>
                    <option value="">-no selected-</option>
                    <option value="AFOLU">AFOLU</option>
                    <option value="Any transportation project">Any transportation project</option>
                    <option value="ARR">ARR</option>
                    <option value="Biomas to Electricity">Biomas to Electricity</option>
                    <option value="Biomas to heat">Biomas to heat</option>
                    <option value="Cogeneration">Cogeneration</option>
                    <option value="Combined cycle">Combined cycle</option>
                    <option value="Cookstove">Solar Cookstove</option>
                    <option value="Energy Efficiency - Agriculture Sector">Energy Efficiency - Agriculture Sector</option>
                    <option value="Energy Efficiency - Commercial Sector">Energy Efficiency - Commercial Sector</option>
                    <option value="Energy Efficiency - Domestic">Energy Efficiency - Domestic</option>
                    <option value="Energy Efficiency - Industrial">Energy Efficiency - Industrial</option>
                    <option value="Energy Efficiency - Public Sector">Energy Efficiency - Public Sector</option>
                    <option value="Gheotermal">Gheotermal</option>
                    <option value="HFC">HFC</option>
                    <option value="Hydro">Hydro</option>
                    <option value="IFM">Improved Forest Managment</option>
                    <option value="Landfill gas">Landfill gas</option>
                    <option value="Landfill to energy">Landfill to energy</option>
                    <option value="Mangroves">Mangroeves</option>
                    <option value="Manufacturing industries">Manufacturing industries</option>
                    <option value="Manure management">Manure management</option>
                    <option value="Methane Recovery">Methane recovery</option>
                    <option value="Mine Methane Utilization Project">Mine Methane Utilization Project</option>
                    <option value="N20 destrutction">N2O Destruction</option>
                    <option value="Non mine Methane Porject">Non mine Methane Porject</option>
                    <option value="Oil Management">Oil Management</option>
                    <option value="Run of river">Run of river</option>
                    <option value="REDD">REDD</option>
                    <option value="REDD+">REDD+</option>
                    <option value="SF6">SF6</option>
                    <option value="Small Renewable energy projects">Small Renewable energy projects</option>
                    <option value="Small Hydro">Small Hydro</option>
                    <option value="Solar">Solar</option>
                    <option value="Solar Cookstove">Solar Cookstove</option>
                    <option value="Waste">Waste</option>
                    <option value="Waste to compost">Waste to compost</option>
                    <option value="Wind">Wind</option>
                </select>
                <label className='text-gray-400'>CORSIA</label>
                <select
                    className=" border border-gray-200 py-2 px-6 bg-zinc-100/40"
                    value={corsia}
                    onChange={e => setCorsia(e.target.value)}>
                    <option value="">-no selected-</option>
                    <option value="NO">No</option>
                    <option value="YES">Yes</option>
                </select>
                <label className='text-gray-400'>COUNTRY</label>
                <select
                    className=" border border-gray-200 py-2 px-6 bg-zinc-100/40"
                    value={pais}
                    onChange={e => setPais(e.target.value)}>
                    <option value="">-no selected-</option>
                    <option value="Afghanistan">Afghanistan</option>
                    <option value="Åland (Finland)">Åland (Finland)</option>
                    <option value="Albania">Albania</option>
                    <option value="Algeria">Algeria</option>
                    <option value="American Samoa (US)">American Samoa (US)</option>
                    <option value="Andorra">Andorra</option>
                    <option value="Angola">Angola</option>
                    <option value="Anguilla (BOT)">Anguilla (BOT)</option>
                    <option value="Antigua and Barbuda">Antigua and Barbuda</option>
                    <option value="Argentina">Argentina</option>
                    <option value="Armenia">Armenia</option>
                    <option value="Artsakh">Artsakh</option>
                    <option value="Aruba (Netherlands)">Aruba (Netherlands)</option>
                    <option value="Australia">Australia</option>
                    <option value="Austria">Austria</option>
                    <option value="Azerbaijan">Azerbaijan</option>
                    <option value="Bahamas">Bahamas</option>
                    <option value="Bahrain">Bahrain</option>
                    <option value="Bangladesh">Bangladesh</option>
                    <option value="Barbados">Barbados</option>
                    <option value="Belarus">Belarus</option>
                    <option value="Belgium">Belgium</option>
                    <option value="Belize">Belize</option>
                    <option value="Benin">Benin</option>
                    <option value="Bermuda (BOT)">Bermuda (BOT)</option>
                    <option value="Bhutan">Bhutan</option>
                    <option value="Bolivia">Bolivia</option>
                    <option value="Bonaire (Netherlands)">Bonaire (Netherlands)</option>
                    <option value="Bosnia and Herzegovina">Bosnia and Herzegovina</option>
                    <option value="Botswana">Botswana</option>
                    <option value="Brazil">Brazil</option>
                    <option value="British Virgin Islands (BOT)">British Virgin Islands (BOT)</option>
                    <option value="Brunei">Brunei</option>
                    <option value="Bulgaria">Bulgaria</option>
                    <option value="Burkina Faso">Burkina Faso</option>
                    <option value="Burundi">Burundi</option>
                    <option value="Cambodia">Cambodia</option>
                    <option value="Cameroon">Cameroon</option>
                    <option value="Canada">Canada</option>
                    <option value="Cape Verde">Cape Verde</option>
                    <option value="Cayman Islands (BOT)">Cayman Islands (BOT)</option>
                    <option value="Central African Republic">Central African Republic</option>
                    <option value="Chad">Chad</option>
                    <option value="Chile">Chile</option>
                    <option value="China">China</option>
                    <option value="Christmas Island (Australia)">Christmas Island (Australia)</option>
                    <option value="Cocos (Keeling) Islands (Australia)">Cocos (Keeling) Islands (Australia)</option>
                    <option value="Colombia">Colombia</option>
                    <option value="Comoros">Comoros</option>
                    <option value="Congo">Congo</option>
                    <option value="Cook Islands">Cook Islands</option>
                    <option value="Costa Rica">Costa Rica</option>
                    <option value="Croatia">Croatia</option>
                    <option value="Cuba">Cuba</option>
                    <option value="Curaçao (Netherlands)">Curaçao (Netherlands)</option>
                    <option value="Cyprus">Cyprus</option>
                    <option value="Czech Republic">Czech Republic</option>
                    <option value="Denmark">Denmark</option>
                    <option value="Djibouti">Djibouti</option>
                    <option value="Dominica">Dominica</option>
                    <option value="Dominican Republic">Dominican Republic</option>
                    <option value="DR Congo">DR Congo</option>
                    <option value="East Timor">East Timor</option>
                    <option value="Ecuador">Ecuador</option>
                    <option value="Egypt">Egypt</option>
                    <option value="El Salvador">El Salvador</option>
                    <option value="Equatorial Guinea">Equatorial Guinea</option>
                    <option value="Eritrea">Eritrea</option>
                    <option value="Estonia">Estonia</option>
                    <option value="Eswatini">Eswatini</option>
                    <option value="Ethiopia">Ethiopia</option>
                    <option value="Falkland Islands (BOT)">Falkland Islands (BOT)</option>
                    <option value="Faroe Islands (Denmark)">Faroe Islands (Denmark)</option>
                    <option value="Fiji">Fiji</option>
                    <option value="Finland">Finland</option>
                    <option value="France">France</option>
                    <option value="French Guiana (France)">French Guiana (France)</option>
                    <option value="French Polynesia (France)">French Polynesia (France)</option>
                    <option value="Gabon">Gabon</option>
                    <option value="Gambia">Gambia</option>
                    <option value="Georgia">Georgia</option>
                    <option value="Germany">Germany</option>
                    <option value="Ghana">Ghana</option>
                    <option value="Gibraltar (BOT)">Gibraltar (BOT)</option>
                    <option value="Greece">Greece</option>
                    <option value="Greenland (Denmark)">Greenland (Denmark)</option>
                    <option value="Grenada">Grenada</option>
                    <option value="Guadeloupe (France)">Guadeloupe (France)</option>
                    <option value="Guam (US)">Guam (US)</option>
                    <option value="Guatemala">Guatemala</option>
                    <option value="Guernsey (Crown Dependency)">Guernsey (Crown Dependency)</option>
                    <option value="Guinea">Guinea</option>
                    <option value="Guinea-Bissau">Guinea-Bissau</option>
                    <option value="Guyana">Guyana</option>
                    <option value="Haiti">Haiti</option>
                    <option value="Honduras">Honduras</option>
                    <option value="Hong Kong">Hong Kong</option>
                    <option value="Hungary">Hungary</option>
                    <option value="Iceland">Iceland</option>
                    <option value="India">India</option>
                    <option value="Indonesia">Indonesia</option>
                    <option value="Iran">Iran</option>
                    <option value="Iraq">Iraq</option>
                    <option value="Ireland">Ireland</option>
                    <option value="Isle of Man (Crown Dependency)">Isle of Man (Crown Dependency)</option>
                    <option value="Israel">Israel</option>
                    <option value="Italy">Italy</option>
                    <option value="Ivory Coast">Ivory Coast</option>
                    <option value="Jamaica">Jamaica</option>
                    <option value="Japan">Japan</option>
                    <option value="Jersey (Crown Dependency)">Jersey (Crown Dependency)</option>
                    <option value="Jordan">Jordan</option>
                    <option value="Kazakhstan">Kazakhstan</option>
                    <option value="Kenya">Kenya</option>
                    <option value="Kiribati">Kiribati</option>
                    <option value="Kosovo">Kosovo</option>
                    <option value="Kuwait">Kuwait</option>
                    <option value="Kyrgyzstan">Kyrgyzstan</option>
                    <option value="Laos">Laos</option>
                    <option value="Latvia">Latvia</option>
                    <option value="Lebanon">Lebanon</option>
                    <option value="Lesotho">Lesotho</option>
                    <option value="Liberia">Liberia</option>
                    <option value="Libya">Libya</option>
                    <option value="Liechtenstein">Liechtenstein</option>
                    <option value="Lithuania">Lithuania</option>
                    <option value="Luxembourg">Luxembourg</option>
                    <option value="Macau">Macau</option>
                    <option value="Madagascar">Madagascar</option>
                    <option value="Malawi">Malawi</option>
                    <option value="Malaysia">Malaysia</option>
                    <option value="Maldives">Maldives</option>
                    <option value="Mali">Mali</option>
                    <option value="Malta">Malta</option>
                    <option value="Marshall Islands">Marshall Islands</option>
                    <option value="Martinique (France)">Martinique (France)</option>
                    <option value="Mauritania">Mauritania</option>
                    <option value="Mauritius">Mauritius</option>
                    <option value="Mayotte (France)">Mayotte (France)</option>
                    <option value="Mexico">Mexico</option>
                    <option value="Micronesia">Micronesia</option>
                    <option value="Moldova">Moldova</option>
                    <option value="Monaco">Monaco</option>
                    <option value="Mongolia">Mongolia</option>
                    <option value="Montenegro">Montenegro</option>
                    <option value="Montserrat (BOT)">Montserrat (BOT)</option>
                    <option value="Morocco">Morocco</option>
                    <option value="Mozambique">Mozambique</option>
                    <option value="Myanmar">Myanmar</option>
                    <option value="Namibia">Namibia</option>
                    <option value="Nauru">Nauru</option>
                    <option value="Nepal">Nepal</option>
                    <option value="Netherlands">Netherlands</option>
                    <option value="New Caledonia (France)">New Caledonia (France)</option>
                    <option value="New Zealand">New Zealand</option>
                    <option value="Nicaragua">Nicaragua</option>
                    <option value="Niger">Niger</option>
                    <option value="Nigeria">Nigeria</option>
                    <option value="Niue">Niue</option>
                    <option value="Norfolk Island (Australia)">Norfolk Island (Australia)</option>
                    <option value="North Korea">North Korea</option>
                    <option value="North Macedonia">North Macedonia</option>
                    <option value="Northern Cyprus">Northern Cyprus</option>
                    <option value="Northern Mariana Islands (US)">Northern Mariana Islands (US)</option>
                    <option value="Norway">Norway</option>
                    <option value="Oman">Oman</option>
                    <option value="Pakistan">Pakistan</option>
                    <option value="Palau">Palau</option>
                    <option value="Palestine">Palestine</option>
                    <option value="Panama">Panama</option>
                    <option value="Papua New Guinea">Papua New Guinea</option>
                    <option value="Paraguay">Paraguay</option>
                    <option value="Peru">Peru</option>
                    <option value="Philippines">Philippines</option>
                    <option value="Pitcairn Islands (BOT)">Pitcairn Islands (BOT)</option>
                    <option value="Poland">Poland</option>
                    <option value="Portugal">Portugal</option>
                    <option value="Puerto Rico (US)">Puerto Rico (US)</option>
                    <option value="Qatar">Qatar</option>
                    <option value="Réunion (France)">Réunion (France)</option>
                    <option value="Romania">Romania</option>
                    <option value="Russia">Russia</option>
                    <option value="Rwanda">Rwanda</option>
                    <option value="Saba (Netherlands)">Saba (Netherlands)</option>
                    <option value="Saint Barthélemy (France)">Saint Barthélemy (France)</option>
                    <option value="Saint Helena, Ascension and Tristan da Cunha (BOT)">Saint Helena, Ascension and Tristan da Cunha (BOT)</option>
                    <option value="Saint Kitts and Nevis">Saint Kitts and Nevis</option>
                    <option value="Saint Lucia">Saint Lucia</option>
                    <option value="Saint Martin (France)">Saint Martin (France)</option>
                    <option value="Saint Pierre and Miquelon (France)">Saint Pierre and Miquelon (France)</option>
                    <option value="Saint Vincent and the Grenadines">Saint Vincent and the Grenadines</option>
                    <option value="Samoa">Samoa</option>
                    <option value="San Marino">San Marino</option>
                    <option value="São Tomé and Príncipe">São Tomé and Príncipe</option>
                    <option value="Saudi Arabia">Saudi Arabia</option>
                    <option value="Senegal">Senegal</option>
                    <option value="Serbia">Serbia</option>
                    <option value="Seychelles">Seychelles</option>
                    <option value="Sierra Leone">Sierra Leone</option>
                    <option value="Singapore">Singapore</option>
                    <option value="Sint Eustatius (Netherlands)">Sint Eustatius (Netherlands)</option>
                    <option value="Sint Maarten (Netherlands)">Sint Maarten (Netherlands)</option>
                    <option value="Slovakia">Slovakia</option>
                    <option value="Slovenia">Slovenia</option>
                    <option value="Solomon Islands">Solomon Islands</option>
                    <option value="Somalia">Somalia</option>
                    <option value="South Africa">South Africa</option>
                    <option value="South Korea">South Korea</option>
                    <option value="South Sudan">South Sudan</option>
                    <option value="Spain">Spain</option>
                    <option value="Sri Lanka">Sri Lanka</option>
                    <option value="Sudan">Sudan</option>
                    <option value="Suriname">Suriname</option>
                    <option value="Svalbard and Jan Mayen (Norway)">Svalbard and Jan Mayen (Norway)</option>
                    <option value="Sweden">Sweden</option>
                    <option value="Switzerland">Switzerland</option>
                    <option value="Syria">Syria</option>
                    <option value="Taiwan">Taiwan</option>
                    <option value="Tajikistan">Tajikistan</option>
                    <option value="Tanzania">Tanzania</option>
                    <option value="Thailand">Thailand</option>
                    <option value="Togo">Togo</option>
                    <option value="Tokelau (NZ)">Tokelau (NZ)</option>
                    <option value="Tonga">Tonga</option>
                    <option value="Transnistria">Transnistria</option>
                    <option value="Trinidad and Tobago">Trinidad and Tobago</option>
                    <option value="Tunisia">Tunisia</option>
                    <option value="Turkey">Turkey</option>
                    <option value="Turkmenistan">Turkmenistan</option>
                    <option value="Turks and Caicos Islands (BOT)">Turks and Caicos Islands (BOT)</option>
                    <option value="Tuvalu">Tuvalu</option>
                    <option value="U.S. Virgin Islands (US)">U.S. Virgin Islands (US)</option>
                    <option value="Uganda">Uganda</option>
                    <option value="Ukraine">Ukraine</option>
                    <option value="United Arab Emirates">United Arab Emirates</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="United States">United States</option>
                    <option value="Uruguay">Uruguay</option>
                    <option value="Uzbekistan">Uzbekistan</option>
                    <option value="Vanuatu">Vanuatu</option>
                    <option value="Vatican City">Vatican City</option>
                    <option value="Venezuela">Venezuela</option>
                    <option value="Vietnam">Vietnam</option>
                    <option value="Wallis and Futuna (France)">Wallis and Futuna (France)</option>
                    <option value="Western Sahara">Western Sahara</option>
                    <option value="Yemen">Yemen</option>
                    <option value="Zambia">Zambia</option>
                    <option value="Zimbabwe">Zimbabwe</option>
                </select>
                <label className='text-gray-400'>SDG</label>
                <select
                    className=" border border-gray-200 py-2 px-6 bg-zinc-100/40"
                    value={sdg}
                    onChange={e => setSdg(e.target.value)}>
                    <option value="">-no selected-</option>
                    <option value="N/A">N/A</option>
                    <option value="NO">No</option>
                    <option value="YES">Yes</option>
                </select>
                <label className='text-gray-400'>AVAILABILITY</label>
                <input
                    type='text'
                    placeholder='ex: Spot - november 2024'
                    value={disponible}
                    onChange={e => setDisponible(e.target.value)} />
                <label className='text-gray-400'>Notes</label>
                <textarea
                    placeholder='ex: Proyecto de TD '
                    value={notas}
                    onChange={e => setNotas(e.target.value)} />
                <label className='text-gray-400'>Files</label>
                <div className='mb-2 flex flex-wrap gap-1'>
                    {!!files?.length && files.map(link => (
                        <div key={link} className='flex h-20 bg-white p-4 shadow-sm rounded-sm border border-gray-200'>
                            <a href={link} target='_blank'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                                </svg>
                                <span onClick={e => deleteFile(e, link)} className="swym-delete-img">x</span>
                            </a>
                        </div>
                    ))}
                    {isUploading && (
                        <div className="h-24 flex items-center">
                            <Spinner />
                        </div>
                    )}
                    <label className="w-20 h-20 cursor-pointer text-center flex flex-col items-center justify-center text-sm gap-1 rounded-sm bg-white shadow-sm border border text-gray-400">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                        </svg>
                        <div>
                            Upload file
                        </div>
                        <input type="file" onChange={uploadFiles} className="hidden" />
                    </label>
                    {!files?.length && (
                        <div className='text-gray-400'> No attached files </div>
                    )}
                </div>
                <button type="submit" className="bg-green-600 text-white px-3 py-1 ms-1 mt-1 rounded shadow-sm hover:bg-green-500 focus:outline-none focus:ring focus:ring-green-400">
                    Save
                </button>
                {error && (
                    <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
                        {error}
                    </div>
                )}
            </form>
        </div >
    )
}