import React from 'react';
import classNames from 'classnames/bind';

import Button from '../../components/Button';
import styles from './PersonalInfo.module.scss';

const cx = classNames.bind(styles);

const PersonalInfo = () => {
    return (
        <div className="">
            <form className="form">
                <div className={cx('form__row')}>
                    <div className="row">
                        <div className="col col-6 col-lg-12">
                            <div className={cx('wrapper')}>
                                <h5 className={cx('form__label')}>Full name</h5>
                                <input
                                    type="text"
                                    className={cx('form__input')}
                                    placeholder="Full name"
                                />
                            </div>
                        </div>
                        <div className="col col-6 col-lg-12">
                            <div className={cx('wrapper')}>
                                <h5 className={cx('form__label')}>Gender</h5>
                                <select
                                    name=""
                                    id=""
                                    className={cx('form__select')}
                                >
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="non-binary">
                                        non-binary
                                    </option>
                                    <option value="not-to-say">
                                        Prefer not to say
                                    </option>
                                </select>
                            </div>
                        </div>
                        <div className="col col-6 col-lg-12">
                            <div className={cx('wrapper')}>
                                <h5 className={cx('form__label')}>
                                    Gender Email
                                </h5>
                                <input
                                    type="email"
                                    className={cx('form__input')}
                                    placeholder="Email"
                                />
                            </div>
                        </div>
                        <div className="col col-6 col-lg-12">
                            <div className={cx('wrapper')}>
                                <div className="row gy-0 gx-1">
                                    <div className="col col-12">
                                        <h5 className={cx('form__label')}>
                                            Date of birth
                                        </h5>
                                    </div>
                                    <div className="col col-3 col-sm-6">
                                        <select
                                            name=""
                                            id=""
                                            className={cx('form__select')}
                                        >
                                            <option value="0">1</option>
                                            <option value="1">2</option>
                                            <option value="2">3</option>
                                            <option value="3">4</option>
                                            <option value="4">5</option>
                                            <option value="5">6</option>
                                            <option value="6">7</option>
                                            <option value="7">8</option>
                                            <option value="8">9</option>
                                            <option value="9">10</option>
                                            <option value="10">11</option>
                                            <option value="11">12</option>
                                            <option value="12">13</option>
                                            <option value="13">14</option>
                                            <option value="14">15</option>
                                            <option value="15">16</option>
                                            <option value="16">17</option>
                                            <option value="17">18</option>
                                            <option value="18">19</option>
                                            <option value="19">20</option>
                                            <option value="20">21</option>
                                            <option value="21">22</option>
                                            <option value="22">23</option>
                                            <option value="23">24</option>
                                            <option value="24">25</option>
                                            <option value="25">26</option>
                                            <option value="26">27</option>
                                            <option value="27">28</option>
                                            <option value="28">29</option>
                                            <option value="29">30</option>
                                        </select>
                                    </div>
                                    <div className="col col-3 col-sm-6 ">
                                        <select className={cx('form__select')}>
                                            <option value="January">Jan</option>
                                            <option value="February">
                                                Feb
                                            </option>
                                            <option value="March">Mar</option>
                                            <option value="April">Apr</option>
                                            <option value="May">May</option>
                                            <option value="June">Jun</option>
                                            <option value="July">Jul</option>
                                            <option value="August">Aug</option>
                                            <option value="September">
                                                Sep
                                            </option>
                                            <option value="October">Oct</option>
                                            <option value="November">
                                                Nov
                                            </option>
                                            <option value="December">
                                                Dec
                                            </option>
                                        </select>
                                    </div>
                                    <div className="col col-6 col-sm-12 gy-sm-1">
                                        <select className={cx('form__select')}>
                                            <option value="1990">1990</option>
                                            <option value="1991">1991</option>
                                            <option value="1992">1992</option>
                                            <option value="1993">1993</option>
                                            <option value="1994">1994</option>
                                            <option value="1995">1995</option>
                                            <option value="1996">1996</option>
                                            <option value="1997">1997</option>
                                            <option value="1998">1998</option>
                                            <option value="1999">1999</option>
                                            <option value="2000">2000</option>
                                            <option value="2001">2001</option>
                                            <option value="2002">2002</option>
                                            <option value="2003">2003</option>
                                            <option value="2004">2004</option>
                                            <option value="2005">2005</option>
                                            <option value="2006">2006</option>
                                            <option value="2007">2007</option>
                                            <option value="2008">2008</option>
                                            <option value="2009">2009</option>
                                            <option value="2010">2010</option>
                                            <option value="2011">2011</option>
                                            <option value="2012">2012</option>
                                            <option value="2013">2013</option>
                                            <option value="2014">2014</option>
                                            <option value="2015">2015</option>
                                            <option value="2016">2016</option>
                                            <option value="2017">2017</option>
                                            <option value="2018">2018</option>
                                            <option value="2019">2019</option>
                                            <option value="2020">2020</option>
                                            <option value="2021">2021</option>
                                            <option value="2022">2022</option>
                                            <option value="2023">2023</option>
                                            <option value="2023">2024</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col col-6 col-lg-12">
                            <div className={cx('wrapper')}>
                                <h5 className={cx('form__label')}>Phone</h5>
                                <input
                                    type="email"
                                    className={cx('form__input')}
                                    placeholder="+1234567890"
                                />
                            </div>
                        </div>
                        <div className="col col-6 col-lg-12">
                            <div className={cx('wrapper')}>
                                <h5 className={cx('form__label')}>
                                    Alternative phone
                                </h5>
                                <input
                                    type="email"
                                    className={cx('form__input')}
                                    placeholder="+1234567890"
                                />
                            </div>
                        </div>
                        <div className="col col-4 col-lg-12">
                            <div className={cx('wrapper')}>
                                <h5 className={cx('form__label')}>Facebook</h5>
                                <input
                                    type="email"
                                    className={cx('form__input')}
                                    placeholder="Facebook"
                                />
                            </div>
                        </div>
                        <div className="col col-4 col-lg-12">
                            <div className={cx('wrapper')}>
                                <h5 className={cx('form__label')}>Instagram</h5>
                                <input
                                    type="email"
                                    className={cx('form__input')}
                                    placeholder="Instagram"
                                />
                            </div>
                        </div>
                        <div className="col col-4 col-lg-12">
                            <div className={cx('wrapper')}>
                                <h5 className={cx('form__label')}>Twitter</h5>
                                <input
                                    type="email"
                                    className={cx('form__input')}
                                    placeholder="Twitter"
                                />
                            </div>
                        </div>
                        <div className="col col-12">
                            <div className={cx('form__btn-wrapper')}>
                                <Button
                                    type="submit"
                                    className={cx('form__submit-btn')}
                                >
                                    Save changes
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default PersonalInfo;
