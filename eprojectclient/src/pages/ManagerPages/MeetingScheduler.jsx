import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import TimePicker from 'react-time-picker';
import "react-datepicker/dist/react-datepicker.css";
import 'react-time-picker/dist/TimePicker.css';
import { Button } from '@chakra-ui/react';
import styles from '../../layout/AdminLayout.module.css';

const MeetingScheduler = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [meetingDate, setMeetingDate] = useState(null);
    const [meetingTime, setMeetingTime] = useState('');

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleSave = () => {
        alert(`Cuộc họp được lên lịch vào ${meetingDate} lúc ${meetingTime}`);
        handleCloseModal();
    };

    return (
        <div>
            <Button
            className={styles['button-create-meeting']}
                bg='whiteAlpha.300'
                _hover={{ bg: "whiteAlpha.200" }}
                _active={{ bg: "whiteAlpha.100" }}
                mb={{ sm: "16px", xl: "24px" }}
                color={"white"}
                fontWeight='regular'
                fontSize='sm'
                minW='185px'
                mx='auto'
                onClick={handleOpenModal}
            >
                Tạo cuộc họp
            </Button>

            {isModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Chọn thời gian cuộc họp</h2>
                        <div>
                            <label>Ngày:</label>
                            <DatePicker
                                selected={meetingDate}
                                onChange={date => setMeetingDate(date)}
                                dateFormat="dd/MM/yyyy"
                                placeholderText="Chọn ngày"
                            />
                        </div>
                        <div>
                            <label>Giờ:</label>
                            <TimePicker
                                value={meetingTime}
                                onChange={time => setMeetingTime(time)}
                                disableClock
                                format="HH:mm"
                                placeholder="Chọn giờ"
                            />
                        </div>
                        <button onClick={handleSave}>Lưu</button>
                        <button onClick={handleCloseModal}>Hủy</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MeetingScheduler;
