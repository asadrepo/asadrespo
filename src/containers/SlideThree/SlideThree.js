import React, {Component} from 'react';

class SlideThree extends Component {
    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="modal fade" id="exampleModalCenter7" tabIndex={-1} role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                        <div className="modal-dialog modal-lg main_bav" role="document">
                            <div className="modal-content bav_modal">
                                <button type="button" className="close bav_close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                                <div className="modal-body bav_modal_inner_padding">
                                    <div className="container">
                                        <h3>Register as a Vendor</h3>
                                        <label htmlFor="Email">Email</label>
                                        <input type="email" className="form-control" />
                                        <label htmlFor="Name">Name</label>
                                        <input type="text" className="form-control" />
                                        <input type="checkbox" />
                                        <span>Do you want to become vendor?</span>
                                        <div className="clearfix" />
                                        <label htmlFor="Password">Password</label>
                                        <input type="password" className="form-control" />
                                        <label htmlFor="ConfirmPassword">Confirm Password</label>
                                        <input type="password" className="form-control" />
                                        <button type="submit" className="btn btn-primary">Sign up</button>
                                        <a > &lt;&lt; Back</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="inner_top_section_mp">
                        <label htmlFor="MarkITPlace">MARKITPLACE</label>
                        <a  data-toggle="modal" data-target="#exampleModalCenter7">Become a Vendor</a>
                    </div>
                    <div className="mkp_header">
                        <ul>
                            <li><a >Products</a></li>
                            <li><a >Services</a></li>
                            <li><a >Solutions</a></li>
                            <li><a >Deals</a></li>
                        </ul>
                    </div>
                    <div className="col-md-12 mkp_banner">
                        <div className="row">
                            <div className="col-md-9 pr-0">
                                <img src="images/markitplace_banner.png" alt="MarkITPlace" />
                            </div>
                            <div className="col-md-3 pl-0 deals_content">
                                <span><img src="images/logitech.png" alt="Logitech" /></span><br />
                                <label htmlFor="DealOfTheWeek">Deal of The Week</label>
                                <p>Logitech M570<br />
                                    Wireless Trackball<br />
                                    <strong>Save 50%</strong><br />
                                    <a >Shop Now</a>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-12 mkp_content">
                        <h3>Product Showcase</h3>
                        <h4>Featured Products</h4>
                        {/* FEATURED PRODUCTS TABS */}
                        <div className="tab-card">
                            <div className="card-header tab-card-header">
                                <ul className="nav nav-tabs card-header-tabs" id="myTab" role="tablist">
                                    <li className="nav-item">
                                        <a className="nav-link" id="one-tab" data-toggle="tab" href="#one" role="tab" aria-controls="One" aria-selected="true">Pre-order</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" id="two-tab" data-toggle="tab" href="#two" role="tab" aria-controls="Two" aria-selected="false">Top Picks</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" id="three-tab" data-toggle="tab" href="#three" role="tab" aria-controls="Three" aria-selected="false">Microsoft</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" id="four-tab" data-toggle="tab" href="#four" role="tab" aria-controls="Four" aria-selected="false">Cisco</a>
                                    </li>
                                </ul>
                            </div>
                            <div className="tab-content" id="myTabContent">
                                <div className="tab-pane fade show active" id="one" role="tabpanel" aria-labelledby="one-tab">
                                    <section id="demos">
                                        <div className="row">
                                            <div className="large-12 columns">
                                                <div className="owl-carousel owl-theme">
                                                    <div className="item">
                                                        <img src="images/prd1.png" alt="Product1" />
                                                        <div className="description_text">
                                                            <strong>WI-FI 6 (802.11AX)</strong><br />
                                                            <small>Catalyst access points</small>
                                                            <div className="price">$450.99</div>
                                                        </div>
                                                    </div>
                                                    <div className="item">
                                                        <img src="images/prd2.png" alt="Product2" />
                                                        <div className="description_text">
                                                            <strong>802.11AC Wave 2</strong><br />
                                                            <small>Aironet access points</small>
                                                            <div className="price">$233.99</div>
                                                        </div>
                                                    </div>
                                                    <div className="item">
                                                        <img src="images/prd3.png" alt="Product3" />
                                                        <div className="description_text">
                                                            <strong>802.11AC Wave 2</strong><br />
                                                            <small>Aironet 1850 Series</small>
                                                            <div className="price">$318.99</div>
                                                        </div>
                                                    </div>
                                                    <div className="item">
                                                        <img src="images/prd4.png" alt="Product4" />
                                                        <div className="description_text">
                                                            <strong>Cloud-Managed</strong><br />
                                                            <small>Meraki MR55 (new)</small>
                                                            <div className="price">$215.99</div>
                                                        </div>
                                                    </div>
                                                    <div className="item">
                                                        <img src="images/prd5.png" alt="Product5" />
                                                        <div className="description_text">
                                                            <strong>Outdoor Access Points</strong><br />
                                                            <small>Meraki MR55 (new)</small>
                                                            <div className="price">$455.99</div>
                                                        </div>
                                                    </div>
                                                    <div className="item">
                                                        <img src="images/prd6.png" alt="Product6" />
                                                        <div className="description_text">
                                                            <strong>Wireless Networking</strong><br />
                                                            <small>Small Business 500 Series</small>
                                                            <div className="price">$88.55</div>
                                                        </div>
                                                    </div>
                                                    <div className="item">
                                                        <img src="images/prd1.png" alt="Product1" />
                                                        <div className="description_text">
                                                            <strong>WI-FI 6 (802.11AX)</strong><br />
                                                            <small>Catalyst access points</small>
                                                            <div className="price">$450.99</div>
                                                        </div>
                                                    </div>
                                                    <div className="item">
                                                        <img src="images/prd2.png" alt="Product2" />
                                                        <div className="description_text">
                                                            <strong>802.11AC Wave 2</strong><br />
                                                            <small>Aironet access points</small>
                                                            <div className="price">$233.99</div>
                                                        </div>
                                                    </div>
                                                    <div className="item">
                                                        <img src="images/prd3.png" alt="Product3" />
                                                        <div className="description_text">
                                                            <strong>802.11AC Wave 2</strong><br />
                                                            <small>Aironet 1850 Series</small>
                                                            <div className="price">$318.99</div>
                                                        </div>
                                                    </div>
                                                    <div className="item">
                                                        <img src="images/prd4.png" alt="Product4" />
                                                        <div className="description_text">
                                                            <strong>Cloud-Managed</strong><br />
                                                            <small>Meraki MR55 (new)</small>
                                                            <div className="price">$215.99</div>
                                                        </div>
                                                    </div>
                                                    <div className="item">
                                                        <img src="images/prd5.png" alt="Product5" />
                                                        <div className="description_text">
                                                            <strong>Outdoor Access Points</strong><br />
                                                            <small>Meraki MR55 (new)</small>
                                                            <div className="price">$455.99</div>
                                                        </div>
                                                    </div>
                                                    <div className="item">
                                                        <img src="images/prd6.png" alt="Product6" />
                                                        <div className="description_text">
                                                            <strong>Wireless Networking</strong><br />
                                                            <small>Small Business 500 Series</small>
                                                            <div className="price">$88.55</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </section>
                                </div>
                                <div className="tab-pane fade" id="two" role="tabpanel" aria-labelledby="two-tab">
                                    <section id="demos1">
                                        <div className="row">
                                            <div className="large-12 columns">
                                                <div className="owl-carousel owl-theme">
                                                    <div className="item">
                                                        <img src="images/prd1.png" alt="Product1" />
                                                        <div className="description_text">
                                                            <strong>WI-FI 6 (802.11AX)</strong><br />
                                                            <small>Catalyst access points</small>
                                                            <div className="price">$450.99</div>
                                                        </div>
                                                    </div>
                                                    <div className="item">
                                                        <img src="images/prd2.png" alt="Product2" />
                                                        <div className="description_text">
                                                            <strong>802.11AC Wave 2</strong><br />
                                                            <small>Aironet access points</small>
                                                            <div className="price">$233.99</div>
                                                        </div>
                                                    </div>
                                                    <div className="item">
                                                        <img src="images/prd3.png" alt="Product3" />
                                                        <div className="description_text">
                                                            <strong>802.11AC Wave 2</strong><br />
                                                            <small>Aironet 1850 Series</small>
                                                            <div className="price">$318.99</div>
                                                        </div>
                                                    </div>
                                                    <div className="item">
                                                        <img src="images/prd4.png" alt="Product4" />
                                                        <div className="description_text">
                                                            <strong>Cloud-Managed</strong><br />
                                                            <small>Meraki MR55 (new)</small>
                                                            <div className="price">$215.99</div>
                                                        </div>
                                                    </div>
                                                    <div className="item">
                                                        <img src="images/prd5.png" alt="Product5" />
                                                        <div className="description_text">
                                                            <strong>Outdoor Access Points</strong><br />
                                                            <small>Meraki MR55 (new)</small>
                                                            <div className="price">$455.99</div>
                                                        </div>
                                                    </div>
                                                    <div className="item">
                                                        <img src="images/prd6.png" alt="Product6" />
                                                        <div className="description_text">
                                                            <strong>Wireless Networking</strong><br />
                                                            <small>Small Business 500 Series</small>
                                                            <div className="price">$88.55</div>
                                                        </div>
                                                    </div>
                                                    <div className="item">
                                                        <img src="images/prd1.png" alt="Product1" />
                                                        <div className="description_text">
                                                            <strong>WI-FI 6 (802.11AX)</strong><br />
                                                            <small>Catalyst access points</small>
                                                            <div className="price">$450.99</div>
                                                        </div>
                                                    </div>
                                                    <div className="item">
                                                        <img src="images/prd2.png" alt="Product2" />
                                                        <div className="description_text">
                                                            <strong>802.11AC Wave 2</strong><br />
                                                            <small>Aironet access points</small>
                                                            <div className="price">$233.99</div>
                                                        </div>
                                                    </div>
                                                    <div className="item">
                                                        <img src="images/prd3.png" alt="Product3" />
                                                        <div className="description_text">
                                                            <strong>802.11AC Wave 2</strong><br />
                                                            <small>Aironet 1850 Series</small>
                                                            <div className="price">$318.99</div>
                                                        </div>
                                                    </div>
                                                    <div className="item">
                                                        <img src="images/prd4.png" alt="Product4" />
                                                        <div className="description_text">
                                                            <strong>Cloud-Managed</strong><br />
                                                            <small>Meraki MR55 (new)</small>
                                                            <div className="price">$215.99</div>
                                                        </div>
                                                    </div>
                                                    <div className="item">
                                                        <img src="images/prd5.png" alt="Product5" />
                                                        <div className="description_text">
                                                            <strong>Outdoor Access Points</strong><br />
                                                            <small>Meraki MR55 (new)</small>
                                                            <div className="price">$455.99</div>
                                                        </div>
                                                    </div>
                                                    <div className="item">
                                                        <img src="images/prd6.png" alt="Product6" />
                                                        <div className="description_text">
                                                            <strong>Wireless Networking</strong><br />
                                                            <small>Small Business 500 Series</small>
                                                            <div className="price">$88.55</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </section>
                                </div>
                                <div className="tab-pane fade" id="three" role="tabpanel" aria-labelledby="three-tab">
                                    <section id="demos2">
                                        <div className="row">
                                            <div className="large-12 columns">
                                                <div className="owl-carousel owl-theme">
                                                    <div className="item">
                                                        <img src="images/prd1.png" alt="Product1" />
                                                        <div className="description_text">
                                                            <strong>WI-FI 6 (802.11AX)</strong><br />
                                                            <small>Catalyst access points</small>
                                                            <div className="price">$450.99</div>
                                                        </div>
                                                    </div>
                                                    <div className="item">
                                                        <img src="images/prd2.png" alt="Product2" />
                                                        <div className="description_text">
                                                            <strong>802.11AC Wave 2</strong><br />
                                                            <small>Aironet access points</small>
                                                            <div className="price">$233.99</div>
                                                        </div>
                                                    </div>
                                                    <div className="item">
                                                        <img src="images/prd3.png" alt="Product3" />
                                                        <div className="description_text">
                                                            <strong>802.11AC Wave 2</strong><br />
                                                            <small>Aironet 1850 Series</small>
                                                            <div className="price">$318.99</div>
                                                        </div>
                                                    </div>
                                                    <div className="item">
                                                        <img src="images/prd4.png" alt="Product4" />
                                                        <div className="description_text">
                                                            <strong>Cloud-Managed</strong><br />
                                                            <small>Meraki MR55 (new)</small>
                                                            <div className="price">$215.99</div>
                                                        </div>
                                                    </div>
                                                    <div className="item">
                                                        <img src="images/prd5.png" alt="Product5" />
                                                        <div className="description_text">
                                                            <strong>Outdoor Access Points</strong><br />
                                                            <small>Meraki MR55 (new)</small>
                                                            <div className="price">$455.99</div>
                                                        </div>
                                                    </div>
                                                    <div className="item">
                                                        <img src="images/prd6.png" alt="Product6" />
                                                        <div className="description_text">
                                                            <strong>Wireless Networking</strong><br />
                                                            <small>Small Business 500 Series</small>
                                                            <div className="price">$88.55</div>
                                                        </div>
                                                    </div>
                                                    <div className="item">
                                                        <img src="images/prd1.png" alt="Product1" />
                                                        <div className="description_text">
                                                            <strong>WI-FI 6 (802.11AX)</strong><br />
                                                            <small>Catalyst access points</small>
                                                            <div className="price">$450.99</div>
                                                        </div>
                                                    </div>
                                                    <div className="item">
                                                        <img src="images/prd2.png" alt="Product2" />
                                                        <div className="description_text">
                                                            <strong>802.11AC Wave 2</strong><br />
                                                            <small>Aironet access points</small>
                                                            <div className="price">$233.99</div>
                                                        </div>
                                                    </div>
                                                    <div className="item">
                                                        <img src="images/prd3.png" alt="Product3" />
                                                        <div className="description_text">
                                                            <strong>802.11AC Wave 2</strong><br />
                                                            <small>Aironet 1850 Series</small>
                                                            <div className="price">$318.99</div>
                                                        </div>
                                                    </div>
                                                    <div className="item">
                                                        <img src="images/prd4.png" alt="Product4" />
                                                        <div className="description_text">
                                                            <strong>Cloud-Managed</strong><br />
                                                            <small>Meraki MR55 (new)</small>
                                                            <div className="price">$215.99</div>
                                                        </div>
                                                    </div>
                                                    <div className="item">
                                                        <img src="images/prd5.png" alt="Product5" />
                                                        <div className="description_text">
                                                            <strong>Outdoor Access Points</strong><br />
                                                            <small>Meraki MR55 (new)</small>
                                                            <div className="price">$455.99</div>
                                                        </div>
                                                    </div>
                                                    <div className="item">
                                                        <img src="images/prd6.png" alt="Product6" />
                                                        <div className="description_text">
                                                            <strong>Wireless Networking</strong><br />
                                                            <small>Small Business 500 Series</small>
                                                            <div className="price">$88.55</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </section>
                                </div>
                                <div className="tab-pane fade" id="four" role="tabpanel" aria-labelledby="four-tab">
                                    <section id="demos3">
                                        <div className="row">
                                            <div className="large-12 columns">
                                                <div className="owl-carousel owl-theme">
                                                    <div className="item">
                                                        <img src="images/prd1.png" alt="Product1" />
                                                        <div className="description_text">
                                                            <strong>WI-FI 6 (802.11AX)</strong><br />
                                                            <small>Catalyst access points</small>
                                                            <div className="price">$450.99</div>
                                                        </div>
                                                    </div>
                                                    <div className="item">
                                                        <img src="images/prd2.png" alt="Product2" />
                                                        <div className="description_text">
                                                            <strong>802.11AC Wave 2</strong><br />
                                                            <small>Aironet access points</small>
                                                            <div className="price">$233.99</div>
                                                        </div>
                                                    </div>
                                                    <div className="item">
                                                        <img src="images/prd3.png" alt="Product3" />
                                                        <div className="description_text">
                                                            <strong>802.11AC Wave 2</strong><br />
                                                            <small>Aironet 1850 Series</small>
                                                            <div className="price">$318.99</div>
                                                        </div>
                                                    </div>
                                                    <div className="item">
                                                        <img src="images/prd4.png" alt="Product4" />
                                                        <div className="description_text">
                                                            <strong>Cloud-Managed</strong><br />
                                                            <small>Meraki MR55 (new)</small>
                                                            <div className="price">$215.99</div>
                                                        </div>
                                                    </div>
                                                    <div className="item">
                                                        <img src="images/prd5.png" alt="Product5" />
                                                        <div className="description_text">
                                                            <strong>Outdoor Access Points</strong><br />
                                                            <small>Meraki MR55 (new)</small>
                                                            <div className="price">$455.99</div>
                                                        </div>
                                                    </div>
                                                    <div className="item">
                                                        <img src="images/prd6.png" alt="Product6" />
                                                        <div className="description_text">
                                                            <strong>Wireless Networking</strong><br />
                                                            <small>Small Business 500 Series</small>
                                                            <div className="price">$88.55</div>
                                                        </div>
                                                    </div>
                                                    <div className="item">
                                                        <img src="images/prd1.png" alt="Product1" />
                                                        <div className="description_text">
                                                            <strong>WI-FI 6 (802.11AX)</strong><br />
                                                            <small>Catalyst access points</small>
                                                            <div className="price">$450.99</div>
                                                        </div>
                                                    </div>
                                                    <div className="item">
                                                        <img src="images/prd2.png" alt="Product2" />
                                                        <div className="description_text">
                                                            <strong>802.11AC Wave 2</strong><br />
                                                            <small>Aironet access points</small>
                                                            <div className="price">$233.99</div>
                                                        </div>
                                                    </div>
                                                    <div className="item">
                                                        <img src="images/prd3.png" alt="Product3" />
                                                        <div className="description_text">
                                                            <strong>802.11AC Wave 2</strong><br />
                                                            <small>Aironet 1850 Series</small>
                                                            <div className="price">$318.99</div>
                                                        </div>
                                                    </div>
                                                    <div className="item">
                                                        <img src="images/prd4.png" alt="Product4" />
                                                        <div className="description_text">
                                                            <strong>Cloud-Managed</strong><br />
                                                            <small>Meraki MR55 (new)</small>
                                                            <div className="price">$215.99</div>
                                                        </div>
                                                    </div>
                                                    <div className="item">
                                                        <img src="images/prd5.png" alt="Product5" />
                                                        <div className="description_text">
                                                            <strong>Outdoor Access Points</strong><br />
                                                            <small>Meraki MR55 (new)</small>
                                                            <div className="price">$455.99</div>
                                                        </div>
                                                    </div>
                                                    <div className="item">
                                                        <img src="images/prd6.png" alt="Product6" />
                                                        <div className="description_text">
                                                            <strong>Wireless Networking</strong><br />
                                                            <small>Small Business 500 Series</small>
                                                            <div className="price">$88.55</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </section>
                                </div>
                            </div>
                        </div>
                        {/* FEATURED PRODUCTS TABS */}
                    </div>
                </div>
            </div>
        );
    }
}

export default SlideThree;