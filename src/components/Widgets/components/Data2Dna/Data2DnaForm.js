import React from 'react';
import DropDown from '../../../common/DropDown';
import InputRange from '../../../common/InputRange';
import { ToastProvider, useToasts } from 'react-toast-notifications'
import { isSubscribed } from '../../../../containers/Auth/Auth';


///api/v1/malware/type/

const Data2DnaForm = (props) => {

  const { addToast } = useToasts();


    return (
        <div className="row">
                  <div className="col-md-6 dd_user_setting">
                    <div className="row">
                      <div className="col-md-4">
                        <input type="radio" 
                                name="module_name" 
                                value="security_news" 
                                onChange={props.onChangeRadioButton}
                         /> <span>Security News {props.onSubmitHandler}</span>
                      </div>
                      <div className="col-md-8">
                        <DropDown name={'security_news'} 
                                  data={props.newsCategories}
                                  title={'Select Category'}
                                  onChange={props.onChangeDropDown}
                                  id={'name'}
                                  
                        />
                      </div>
                      <div className="col-md-4">
                        <input type="radio" 
                                name="module_name" 
                                value="patch" 
                                onChange={props.onChangeRadioButton}
                         /> <span onClick={() => addToast('Saved Successfully', { appearance: 'success' })}>Patch</span>
                      </div>
                      <div className="col-md-8">
                        <input type="text" 
                                className="form-control" 
                                name={'patch'} 
                                placeholder="Enter Keywords" 
                                onChange={props.onChangeDropDown}
                         />
                        <small className="patch_example">Eg. microsoft windows</small>
                      </div>
                      <div className="col-md-4">
                        <input type="radio" 
                                name="module_name" 
                                value="vulnerabilities" 
                                onChange={props.onChangeRadioButton} 
                        /> <span>Vulnerability</span>
                      </div>
                      <div className="col-md-8">
                      <DropDown name={'vulnerbility_vendor'} 
                                  data={props.vulnerbilitiesVendor}
                                  title={'Select Vendor'}
                                  onChange={props.onChangeVulnerbilityVendor}
                                  id={'id'}
                        />
                        <DropDown name={'vulnerabilities'} 
                                  data={props.vulnerbilitiesProducts}
                                  title={'Select Product'}
                                  onChange={props.onChangeDropDown}
                                  id={'name'}
                        />
                      
                      </div>
                      <div className="col-md-4 patch_radio">
                        <input type="radio" 
                                name="module_name" 
                                value="malware" 
                                onChange={props.onChangeRadioButton}
                           /> <span>Malware</span>
                      </div>
                      <div className="col-md-8">
                        <DropDown name={'malware'} 
                                  data={props.malwareType}
                                  title={'Select Type'}
                                  onChange={props.onChangeDropDown}
                                  id={'name'}
                         />
                      </div>
                      <div className="col-md-4 patch_radio">
                        Send Email :
                      </div>
                      <div className="col-md-8 free_user_email">
                        <input type="checkbox" name="is_notify" checked={props.isNotify} onChange={props.onChangeIsNotify} /> <span>test.example@test.com</span>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                  <InputRange name="security_news"
                                onChange={props.onChangeRange}
                                
                    /> 
                    <br />
                    <InputRange name="patch"
                                onChange={props.onChangeRange}
                    /> 
                    <br />
                    <InputRange name="vulnerabilities"
                                onChange={props.onChangeRange}
                    /> 
                    <br />
                    <br />
                    <br />
                    <InputRange name="malware"
                                onChange={props.onChangeRange}
                    /> 
                    <br />
                    <br />
                    <div className="clearfix" />
                    <div className="premium_user_email">
                      <div className={isSubscribed() ? '' : 'faded3'}>
                        <p>This section is enable for Premium Users only.</p>
                      </div>
                      <input type="email" 
                              className="form-control" 
                              name="emails" 
                              onChange={props.onChangeEmails} 
                              placeholder="Add more email addresses" 
                        />
                      <small>Eg. yourname@domain.com, youremail@domain.com</small>
                    </div>
                  </div>
                </div>
                
    );
}

export default Data2DnaForm;