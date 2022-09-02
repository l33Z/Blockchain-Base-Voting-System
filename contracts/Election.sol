// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Election {
    address public admin;

    // ----------------- PHASES  -----------------
    enum PHASE {
        registration,
        voting,
        done,
        reset
    }
    PHASE public ElectionState;

    // ----------------- Candidate Schema -----------------
    struct Candidate {
        string candidate_id;
        string candidate_name;
        string candidate_partyName;
        string candidate_imageName;
        uint256 candidate_age;
        uint256 candidate_totalVotes;
        bool is_added;
    }

    mapping(string => Candidate) public candidates;
    string[] public candidate_ids_list;
    Candidate[] candidatesList;
    Candidate[] resultCandidatesList;

    // ----------------- Voter Schema -----------------
    struct Voter {
        string voter_id;
        string votedCandidate_id;
        bool is_registerd;
        bool hasVoted;
    }

    mapping(string => Voter) public voters;
    string[] public voter_ids_list;
    Voter[] votersList;

    // ----------------- Modifiers -----------------
    modifier onlyAdmin() {
        require(
            msg.sender == admin,
            "You dont have permission to perform this action"
        );
        _;
    }

    uint256 public candidatesCount;
    uint256 public votersCount;

    // ----------------- Constructor -----------------
    constructor() {
        admin = msg.sender;
        ElectionState = PHASE.registration;
    }

    // ----------------- function -----------------
    function changeState(PHASE x) public onlyAdmin {
        ElectionState = x;
    }

    //----------------- Add Candidate ------------------------
    function addCandidate(
        string memory _id,
        string memory _name,
        string memory _party,
        string memory _image,
        uint256 _age
    ) public onlyAdmin {
        require(
            ElectionState == PHASE.registration,
            "Registration phase is over"
        );
        require(candidates[_id].is_added == false, "You Already Registered");
        candidates[_id] = Candidate(_id, _name, _party, _image, _age, 0, true);
        candidate_ids_list.push(_id);
        candidatesList.push(candidates[_id]);
        candidatesCount++;
    }

    //----------------- Voting Registration -----------------
    function voterRegisteration(string memory _voter_id) public {
        require(
            ElectionState == PHASE.registration,
            "Registration phase is over"
        );
        require(
            voters[_voter_id].is_registerd == false,
            "You Already Registered"
        );
        voters[_voter_id] = Voter(_voter_id, "", true, false);
        voter_ids_list.push(_voter_id);
        votersCount++;
    }

    //----------------- Vote -----------------
    function vote(string memory _id, string memory _votedCandidate_id) public {
        require(
            ElectionState == PHASE.voting,
            "Currently Election is not started or Election is over"
        );
        require(voters[_id].is_registerd == true, "Register first");
        require(voters[_id].hasVoted == false, "You have already voted");
        voters[_id].hasVoted = true;
        votersList.push(voters[_id]);
        voters[_id].votedCandidate_id = _votedCandidate_id;
        candidates[_votedCandidate_id].candidate_totalVotes++;
    }

    //----------------- Election Results -----------------
    function getWinner() public view returns (string memory) {
        require(ElectionState == PHASE.done, "Voting is not completed yet");
        uint256 maxVotes = candidates[candidate_ids_list[0]]
            .candidate_totalVotes;
        string memory winner_id = candidates[candidate_ids_list[0]]
            .candidate_id;
        for (uint256 i = 1; i < candidate_ids_list.length; i++) {
            if (
                maxVotes <
                candidates[candidate_ids_list[i]].candidate_totalVotes
            ) {
                maxVotes = candidates[candidate_ids_list[i]]
                    .candidate_totalVotes;
                winner_id = candidates[candidate_ids_list[i]].candidate_id;
            }
        }
        return winner_id;
    }

    //----------------- Add Candidate To Result List ------------------------
    function addCandidateToResultList() public onlyAdmin {
        require(ElectionState == PHASE.done, "Result Phase Is Not Started");
        for (uint256 i = 0; i < candidate_ids_list.length; i++) {
            resultCandidatesList.push(candidates[candidate_ids_list[i]]);
        }
    }

    //----------------- Get Result CandidateList ------------------------
    function getUpdatedCandidateList()
        public
        view
        returns (Candidate[] memory)
    {
        require(ElectionState == PHASE.done, "Result Phase Is Not Started");
        return resultCandidatesList;
    }

    //----------------- Get CandidateList ------------------------
    function allCandidates() public view returns (Candidate[] memory) {
        return candidatesList;
    }

    //----------------- Get CandidateIdList ------------------------
    function getCandidateIdList() public view returns (string[] memory) {
        return candidate_ids_list;
    }

    //----------------- Get VoterIdList ------------------------
    function getVoterIdList() public view returns (string[] memory) {
        return voter_ids_list;
    }

    //----------------- Get VoterList ------------------------
    function allVoters() public view returns (Voter[] memory) {
        return votersList;
    }

    // ----------------- Reset All  ------------------------
    function resetAll() public onlyAdmin {
        require(ElectionState == PHASE.reset, "Election is not Over yet");

        votersCount = 0;
        candidatesCount = 0;

        for (uint256 i = 0; i < candidate_ids_list.length; i++) {
            candidates[candidate_ids_list[i]].is_added = false;
        }

        delete candidate_ids_list;
        delete candidatesList;
        delete resultCandidatesList;

        for (uint256 i = 0; i < voter_ids_list.length; i++) {
            voters[voter_ids_list[i]].is_registerd = false;
        }

        delete voter_ids_list;
        delete votersList;
    }
}
